import * as React from "react";
import { cn } from "@/lib/utils";

export const Separator = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    role="separator"
    className={cn("my-4 h-px w-full bg-gray-200", className)}
    {...props}
  />
);
