import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-tight transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian",
  {
    variants: {
      variant: {
        primary:
          "bg-cyan text-obsidian hover:bg-cyan-soft shadow-[0_0_0_1px_rgba(0,240,255,0.4),0_10px_40px_-10px_rgba(0,240,255,0.55)]",
        secondary:
          "bg-white/[0.04] text-white border border-line-strong hover:bg-white/[0.08] hover:border-white/20",
        ghost: "text-mute-2 hover:text-white",
        outline:
          "border border-line-strong text-white hover:border-cyan/60 hover:text-cyan",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
