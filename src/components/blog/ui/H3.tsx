import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  classes?: string;
}

export const H3: FC<Props> = ({ children, classes }) => {
  return (
    <h3 className={cn("mt-10 mb-6 text-2xl font-semibold", classes)}>
      {children}
    </h3>
  );
};
