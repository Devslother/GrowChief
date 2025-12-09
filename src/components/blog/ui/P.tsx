import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  classes?: string;
}

export const P: FC<Props> = ({ children, classes }) => {
  // Используем div с role="paragraph" вместо p, чтобы избежать вложенных <p> тегов в MDX
  // MDX автоматически оборачивает текст в <p> теги, что создает вложенность при использовании компонента <P>
  return (
    <div className={cn("my-5 text-lg", classes)} role="paragraph">
      {children}
    </div>
  );
};
