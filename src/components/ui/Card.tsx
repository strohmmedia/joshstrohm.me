import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "glow";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const baseStyles = "rounded-2xl transition-all duration-300";
    
    const variants = {
      default: "bg-surface2 border border-border hover:border-text2/20 hover:-translate-y-1",
      glass: "glass hover:bg-surface/80 hover:border-text2/20 hover:-translate-y-1",
      glow: "bg-surface2 border border-border hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1",
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;