// ./components/ui/separator.tsx
'use client';
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils" // Ahora resuelve

export const Separator = ({ className, orientation = 'horizontal', decorative = true, ...props }) => (
  <SeparatorPrimitive.Root
    orientation={orientation}
    decorative={decorative}
    className={cn(
      "shrink-0 bg-gray-200", 
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
);
