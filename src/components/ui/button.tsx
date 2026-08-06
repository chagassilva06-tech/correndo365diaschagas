import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[var(--neon-green)] text-black shadow-lg shadow-[var(--neon-green)]/20 hover:bg-[var(--neon-green)]/90 font-black italic uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-[var(--neon-green)]/30 bg-transparent shadow-sm hover:bg-[var(--neon-green)]/10 hover:text-white font-black italic uppercase tracking-widest",
        secondary: "bg-white/5 text-white border border-white/10 backdrop-blur-md shadow-sm hover:bg-white/10 font-black italic uppercase tracking-widest",
        ghost: "hover:bg-white/5 hover:text-[var(--neon-green)] font-black italic uppercase tracking-widest",
        premium: "bg-gradient-to-r from-[var(--neon-green)] to-[#34D399] text-black shadow-[0_0_20px_rgba(67,230,200,0.4)] hover:shadow-[0_0_30px_rgba(67,230,200,0.6)] font-black italic uppercase tracking-widest transition-all hover:-translate-y-0.5",
        link: "text-[var(--neon-green)] underline-offset-4 hover:underline font-bold",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
