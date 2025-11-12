import { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface Props {
  href: string;
  children: ReactNode;
  handleClose?: () => void;
  classes?: string;
  isActive?: boolean;
}

const CustomLink = ({
  href,
  children,
  handleClose,
  classes,
  isActive,
  ...rest
}: Props) => {
  // Проверяем, внешняя ли ссылка
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      onClick={handleClose}
      className={cn(
        "text-nowrap text-white transition hover:text-primary-orange",
        isActive && "text-primary-orange",
        classes
      )}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
};
export default CustomLink;
