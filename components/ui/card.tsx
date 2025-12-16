// ./components/ui/card.tsx (Corregir la destructuración en todos los subcomponentes)
import React from 'react';
import { cn } from "@/lib/utils"; 

// Componente Card principal (Ya estaba bien)
export const Card = ({ className, children, ...props }) => (
  <div
    className={cn("rounded-xl border bg-card text-card-foreground shadow-sm p-6", className)}
    {...props}
  >
    {children}
  </div>
);

// CORRECCIÓN CRÍTICA: CardHeader
export const CardHeader = ({ className = "", children, ...props }) => (
//                                  ^^^^^^ Agregado valor por defecto
  <div className={cn("flex flex-col space-y-1.5", className)} {...props}>
    {children}
  </div>
);

// CORRECCIÓN: CardTitle
export const CardTitle = ({ className = "", children, ...props }) => (
//                                 ^^^^^^ Agregado valor por defecto
  <h3 className={cn("font-semibold leading-none tracking-tight text-lg", className)} {...props}>
    {children}
  </h3>
);

// CORRECCIÓN: CardDescription
export const CardDescription = ({ className = "", children, ...props }) => (
//                                        ^^^^^^ Agregado valor por defecto
  <p className={cn("text-sm text-muted-foreground text-gray-500", className)} {...props}>
    {children}
  </p>
);

// CORRECCIÓN: CardContent
export const CardContent = ({ className = "", children, ...props }) => (
//                                     ^^^^^^ Agregado valor por defecto
  <div className={cn("p-0 pt-6", className)} {...props}>
    {children}
  </div>
);

// CORRECCIÓN: CardFooter
export const CardFooter = ({ className = "", children, ...props }) => (
//                                    ^^^^^^ Agregado valor por defecto
  <div className={cn("flex items-center pt-0", className)} {...props}>
    {children}
  </div>
);
