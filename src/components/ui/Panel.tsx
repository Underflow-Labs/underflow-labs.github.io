import { ReactNode } from "react";
import { cn } from "../../lib/cn";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export function Panel({ children, className }: PanelProps) {
  return <article className={cn("panel p-6", className)}>{children}</article>;
}
