import { HTMLAttributes, forwardRef } from "react";

const Section = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={`py-16 md:py-24 lg:py-28 ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;