import { HTMLAttributes, forwardRef } from "react";

const Badge = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-surface2 border border-border text-text2 ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;