// ./components/ui/separator.tsx (Modificación de la destructuración)
'use client';
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils" 

export const Separator = ({ className = "", orientation = 'horizontal', decorative = true, ...props }) => (
//                                    ^^^^^^^^^  Asegurarse de que className siempre tiene un valor por defecto (string vacío)
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
