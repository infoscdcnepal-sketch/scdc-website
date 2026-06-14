import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow-md',
        secondary: 'border-2 border-white/70 text-white hover:bg-white hover:text-navy',
        outline: 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
        ghost: 'text-navy hover:bg-navy/5',
      },
      size: {
        default: 'h-12 px-7 text-base',
        sm: 'h-10 px-5 text-sm',
        lg: 'h-14 px-9 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = 'Button';

export { Button, buttonVariants };
