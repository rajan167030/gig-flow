import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Professional, single-color button style
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-semibold shadow-lg bg-indigo-600 text-white transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2 focus-visible:border-transparent hover:bg-indigo-700 hover:scale-[1.03] active:scale-95 active:brightness-90 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-indigo-600 text-white hover:bg-indigo-700',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border border-indigo-600 bg-transparent text-indigo-600 hover:bg-indigo-50',
        secondary: 'bg-indigo-700 text-white hover:bg-indigo-800',
        ghost: 'bg-transparent text-indigo-600 hover:bg-indigo-100',
        link: 'text-indigo-600 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 rounded-md gap-1.5 px-4 py-1.5',
        lg: 'h-12 rounded-lg px-8 py-3 text-lg',
        icon: 'size-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
