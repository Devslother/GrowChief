import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  classes?: string;
}

export const H3: FC<Props> = ({ children, classes }) => {
  return (
    <h3 className={cn("mt-8 mb-1 text-2xl font-semibold", classes)}>
      {children}
    </h3>
  );
};
