import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-[140px] w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-ink placeholder:text-gray-400 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 disabled:opacity-60',
      className
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export { Textarea };
