import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        'flex h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 pr-10 text-base text-ink focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 disabled:opacity-60',
        className
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
      aria-hidden="true"
    />
  </div>
));
Select.displayName = 'Select';

export { Select };
