import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
  isExternal?: boolean;
  classes?: string;
}

export const Anchor: FC<Props> = ({ children, href, isExternal, classes }) => {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "font-body-6 text-secondary-purple underline hover:text-white break-words",
        classes
      )}
    >
      {children}
    </a>
  );
};
