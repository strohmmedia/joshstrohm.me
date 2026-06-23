---
title: "From Chatbot to Agent: What Changed When AI Started Taking Action"
date: "2026-06-23"
excerpt: "I spent a year watching AI shift from generating text to taking action. Here's what I learned building agents with Claude Code, n8n, and Hermes, and why I replaced half my SaaS stack with custom tools."
readTime: "6 min read"
featured: true
image: "/images/blog/from-chatbot-to-agent.png"
---

For the last couple of years, when people said "AI" they meant chatbots. You type something, it types back. Handy for writing emails and summarizing long documents. But that's where it ended. The AI could suggest something, but a human still had to actually do it.

That changed. Not a little. Completely.

I first noticed it when Claude Code and Codex showed up. These weren't assistants that suggested code changes. They read my files. Ran terminal commands. Made edits. Tested their own work. They didn't tell me what to do. They just did things.

That difference between talking and doing. That's the real shift.

## The Hook

I run a consultancy building websites and automation for local businesses. My day to day involves a lot of tools. A CRM. Project management. Scheduling software. Website platforms. A dozen other services held together with n8n workflows.

For a while, I treated AI as a layer on top of all that. Chat interfaces connected to my knowledge base. Summaries of my CRM data. Draft emails I still had to review and send myself.

Then it clicked. If Claude Code could read my file system and run terminal commands, why couldn't an agent read my CRM, understand a lead, and handle the whole follow up without me?

## Starting with OpenCLAW and Hermes

I started digging into agentic frameworks. OpenCLAW was my first real look at what an autonomous agent could do. Give an AI some tools and let it decide when and how to use them. That idea clicked immediately. Not a chatbot with a search tool bolted on. An agent with a goal and a set of tools, working on its own.

Around the same time, Hermes Agent came out from Nous Research. It took the same concept and added a closed learning loop. The agent learns from what it does, saves what works as reusable skills, and gets better over time. That was the piece I didn't know I needed.

I shifted over to Hermes and it's been my daily driver for agentic AI ever since. It handles the tasks I used to do manually. Monitors triggers. Integrates with tools. Works through multi step problems without me watching over it. Not because it follows instructions perfectly, but because it learns how I work and adapts.

## Applying It to Real Work

My main business is building websites for local businesses. I started using Claude Code and Codex to build custom sites for each client. Instead of using a website builder with templates and limits, I could describe exactly what the client needed and the AI built it. Unique design. Custom functionality. No compromises.

On the backend, I tied everything together with n8n. When someone used the chat widget on a site, an n8n agent handled the inquiry. Answered questions. Captured lead details. Triggered follow up sequences. All without me touching it. The agent didn't just log the lead. It responded intelligently and kept the conversation moving.

## The SaaS Replacement Experiment

This part got interesting. I realized that if I could build custom websites from natural language descriptions, I could build custom apps the same way. And if I could build custom apps, I could replace the tools I was paying for with tools that actually fit my workflow.

So I started doing that.

I replaced LessAnnoying CRM with a custom system built around how I actually qualify and track leads. I replaced Notion for project management with a custom tool that follows my exact process, not someone else's template. I replaced Calendly with a custom scheduling system that plugs directly into my workflow. And I stopped using website builders entirely. Every site I build now is custom coded with AI assistance.

None of this was about saving money, though that helped. It was about fit. Off the shelf tools are designed for everyone. Custom tools built with AI are designed for one person. You. The workflow matches how you think. The interface does what you need and nothing you don't.

## What I Learned

The shift from chatbots to agents isn't about better conversations. It's about action.

A chatbot answers questions. An agent qualifies a lead, checks your CRM for existing relationships, researches the company, drafts a personalized response, and routes it to the right person. All without you in the loop.

A code assistant suggests edits. An agentic coding tool reads your requirements, builds the feature, tests it, and shows you the result.

A SaaS tool gives you a standardized interface. A custom built AI application gives you exactly what you need and nothing else.

The technology to do this exists right now. Claude Code, OpenCLAW, Hermes Agent. These tools let you describe what you want and have it built. The bottleneck isn't capability anymore. It's figuring out what to build.
