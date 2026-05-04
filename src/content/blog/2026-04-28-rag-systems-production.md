---
title: "RAG Systems in Production: Lessons from 12 Months"
date: "2026-04-28"
excerpt: "What nobody tells you about retrieval-augmented generation until you've deployed it, scaled it, and watched it fail in interesting ways."
readTime: "14 min read"
featured: true
image: "/images/blog/rag-systems-in-production.png"
---

Eleven months ago we shipped our first RAG system to production. RAG stands for retrieval-augmented generation, which is a fancy way of saying we gave a language model access to specific information so it could answer questions about things it wasn't trained on.

The pitch was compelling. Instead of hoping the model knew everything about our domain, we would give it exactly the documents it needed and let it reason about those documents directly. We would have control over what information it could access, and we could update that information without retraining the model.

Eleven months later, we've served millions of queries, rebuilt chunks of the system twice, and learned more from our failures than our successes. This is what I wish someone had told us before we started.

## The Core Concept Is Simple. The Details Are Not.

RAG sounds simple in principle. You have documents. A user asks a question. You find the relevant documents. You give those documents to the model along with the question. The model answers based on the documents.

The problems start when you try to make this work at scale with real users making real queries. Which documents are relevant? How do you handle questions that could be answered by multiple different documents? What happens when the documents contradict each other? How do you handle queries that don't match any document well?

These are not rhetorical questions. They are problems we have faced and solved and sometimes failed to solve in production.

## Lesson One: Chunking Strategy Determines Everything

Before your system can find relevant documents, you have to break them into pieces. This is called chunking, and it sounds boring, but it is the architectural decision that determines what your system can and cannot retrieve.

We went through four chunking strategies before finding one that worked for our use case.

Fixed-size chunking was our first approach. We split documents every five hundred characters regardless of where the splits happened. This was simple to implement but created obvious problems. We regularly split sentences in half, separating a definition from the term it defined. We split list items from their context. We created chunks that were semantically incoherent.

Sentence window chunking was our second approach. We split on sentences and retrieved surrounding sentences as context. This worked better for precise questions but missed the broader context that questions often implied.

Recursive splitting was our third approach. We split on natural boundaries like paragraphs and sections first, then broke larger chunks down further only when necessary. This balanced semantic coherence with practical retrieval needs.

Semantic chunking is what we use now. We use embeddings to identify where topic shifts happen in documents and split there. The result is chunks that tend to be semantically self-contained, which makes retrieval more reliable.

The lesson here is that chunking is not preprocessing. It is architecture. You will revisit it multiple times as you learn what your users actually ask and how your documents are structured.

## Lesson Two: Embeddings Are Not Magic

Embeddings are the technology that makes semantic search possible. You convert text into a vector of numbers, and texts with similar meanings have vectors that are close together in the mathematical sense. This lets you find documents that are semantically similar to a query even when they don't share exact words.

Embeddings are impressive, but they have real limitations that bite you in production.

The first limitation is query-document asymmetry. Users ask questions using different vocabulary than documents use. A user might ask "how do I reset my password" while your documentation says "password recovery procedure." These mean the same thing but look very different to an embedding model.

The second limitation is sensitivity to phrasing. Small changes in how a query is phrased can produce meaningfully different retrieval results. "What is the deadline for submissions" might retrieve different documents than "when are submissions due" even though they are essentially the same question.

The third limitation is that embeddings capture semantics but not logic. A document explaining how to do something wrong will be semantically similar to a document explaining how to do it right. Retrieval doesn't distinguish between correct and incorrect information.

We addressed some of these limitations with query expansion, where we automatically rewrite user queries to include alternative phrasings. We also added a layer that checks retrieved documents for potential contradictions before presenting them to the model.

## Lesson Three: Re-Ranking Changes Everything

Naive retrieval using cosine similarity in embedding space gets you maybe two-thirds of the way to good results. For our benchmark queries, our initial retrieval found relevant documents about sixty-seven percent of the time. After adding a re-ranker, that number jumped to eighty-nine percent.

Re-ranking is a second stage of relevance assessment that happens after initial retrieval. You retrieve maybe twenty candidates using embeddings, then use a more sophisticated model to reorder those candidates based on actual relevance to the query.

The re-ranker is slower and more expensive than embedding similarity, which is why you run it only on a small candidate set rather than your entire document collection. But the accuracy improvement is significant, and for applications where relevance matters, it is worth the additional latency.

Our re-ranker runs in about fifty milliseconds for a typical query. We batch multiple re-ranking requests to amortize the overhead. For most users, the additional latency is imperceptible, and the quality improvement is noticeable.

## Lesson Four: Evaluation Infrastructure Is Not Optional

When we launched, we had no systematic way to measure whether our system was working. We relied on user feedback and manual testing. This is not enough.

User feedback is sparse and biased. Users give feedback when they are very satisfied or very frustrated. The middle ground, where most of your queries fall, goes unmeasured. You also can't tell from feedback alone whether a wrong answer came from poor retrieval or poor generation.

Manual testing doesn't scale and doesn't catch drift. As your document collection changes, some queries that worked fine will stop working. Without automated evaluation, you only find out when a user complains.

We built a simple evaluation system that runs our benchmark queries weekly and reports retrieval recall and answer quality scores. The benchmark queries are a curated set of queries that represent the range of things users ask, along with the documents we expect to be retrieved and the answers we expect to receive.

This system has caught retrieval regressions three times in the past year. Once because we changed our chunking strategy and didn't re-evaluate. Once because a document was updated with contradictory information. Once because we added new document types that had different structure than our existing collection.

Each time, the evaluation system flagged the problem before any user reported it. That's worth the investment.

## Lesson Five: The Context Length Question Is Still Open

Here is the question I cannot answer yet. As language models support longer and longer context windows, at what point does retrieval become unnecessary?

Currently, we chunk documents because models have context limits. But if a model can handle a million tokens of context, do we need to retrieve at all? Could we just dump our entire document collection into the prompt and let the model find what it needs?

My instinct is that retrieval will remain important even with very large contexts. Retrieval lets you be deliberate about what information is relevant. It lets you provide citations and provenance. It makes the system more interpretable because you can inspect which documents were retrieved.

But I'm watching the context length developments closely. If the trajectory continues, some of our retrieval infrastructure might become unnecessary within a year or two.

## What We Would Do Differently

If I were starting over, I would invest in evaluation infrastructure first, before building any retrieval logic. You cannot improve what you cannot measure, and evaluation is more valuable than any individual retrieval optimization.

I would also start simpler. We built a complicated system with multiple retrieval strategies and fallback paths. A simpler system would have shipped faster and taught us more about user needs before we invested in solving hard problems that maybe didn't need solving.

The last thing I would change is our approach to user data. We launched with minimal logging because of privacy concerns. In retrospect, we should have built privacy-preserving logging from the start. User queries are the best signal for understanding what your system should do, and we denied ourselves months of useful data.

## Where We Are Now

Our current system handles about fifty thousand queries per day. Average retrieval recall is ninety-two percent on our benchmark set. Average answer quality, as rated by our evaluation system, is good for about eighty-seven percent of queries. The remaining thirteen percent either get flagged for human review or get answered with a disclaimer that the answer might not be fully accurate.

This is not a solved problem. We still have failures every week. But we have a system for catching and fixing them, and a team that understands the trade-offs involved in building production AI systems.

If you are building a RAG system, my advice is to start with the simplest possible approach, measure everything from day one, and expect to rebuild at least once. The technology is still young enough that best practices are still being discovered. Build for iteration, because you will need it.