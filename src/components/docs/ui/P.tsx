import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  classes?: string;
}

export const P: FC<Props> = ({ children, classes }) => {
  // Use div with role="paragraph" instead of p to avoid nested <p> tags in MDX
  // MDX automatically wraps text in <p> tags, which creates nesting when using the <P> component
  return (
    <div className={cn("mt-6 text-[16px]", classes)} role="paragraph">
      {children}
    </div>
  );
};
