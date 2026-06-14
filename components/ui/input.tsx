import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-base text-ink placeholder:text-gray-400 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 disabled:opacity-60',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
