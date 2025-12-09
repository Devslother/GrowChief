import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  classes?: string;
}

export const H2: FC<Props> = ({ children, classes }) => {
  return (
    <h2
      className={cn(
        "mt-12 mb-8 text-[32px] leading-[1.05] font-semibold",
        classes
      )}
    >
      {children}
    </h2>
  );
};
