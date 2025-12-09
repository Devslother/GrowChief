import type { FC } from "react";
import { cn } from "@/lib/utils";

interface Props {
  classes?: string;
}

export const Divider: FC<Props> = ({ classes }) => {
  return (
    <div className={cn("my-[30px] h-[1px] w-full bg-white/20", classes)}></div>
  );
};
