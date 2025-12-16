// ./components/ui/card.tsx
import React from 'react';
import { cn } from "@/lib/utils"; // Ahora resuelve

export const Card = ({ className, children, ...props }) => (
  <div
    className={cn("rounded-xl border bg-card text-card-foreground shadow-sm p-6", className)}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className, children, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5", className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3 className={cn("font-semibold leading-none tracking-tight text-lg", className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }) => (
  <p className={cn("text-sm text-muted-foreground text-gray-500", className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={cn("p-0 pt-6", className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }) => (
  <div className={cn("flex items-center pt-0", className)} {...props}>
    {children}
  </div>
);
