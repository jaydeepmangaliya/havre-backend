import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-0 rounded-none hover:bg-primary/90",
        destructive:
          "bg-red-600 text-white border-0 rounded-none hover:bg-red-700",
        outline:
          "border border-primary text-primary rounded-none hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground border-0 rounded-none hover:bg-secondary/80",
        ghost: "text-primary rounded-none hover:bg-secondary",
        link: "text-primary underline-offset-4 p-0 h-auto hover:underline",
      },
      size: {
        default: "h-12 px-8 py-4",
        sm: "h-10 px-6 py-3 text-sm",
        lg: "h-14 px-10 py-4 text-lg",
        icon: "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
