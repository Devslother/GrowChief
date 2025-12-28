"use client";

import { DocsSearch } from "../docs/DocsSearch";
import { docsList } from "@/lib/docs";
import { cn } from "@/lib/utils";
import { ListNavItem } from "../docs/ListNavItem";

type NavItem = { href: string; title: string };

interface Props {
  id?: string;
  open: boolean;
  onClose: () => void;
  navLinks: NavItem[];
  pathname: string;
}

export const DocsMobileDrawer = ({
  id,
  open,
  onClose,
  navLinks,
  pathname,
}: Props) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40",
        // контейнер кликается только когда открыт (чтобы не блокировать страницу)
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      {/* Оверлей: плавная прозрачность */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={cn(
          "absolute inset-0 transition-opacity duration-300 ease-out",
          open ? "bg-black/60 opacity-100" : "opacity-0"
        )}
      />

      {/* Панель: выезд сверху */}
      <aside
        id={id}
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute inset-x-0 top-0 w-full bg-black shadow-2xl h-full overflow-y-auto",
          // анимация трансформации
          "transition-transform duration-300 ease-out will-change-transform",
          open ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="flex flex-col items-start pt-[90px] px-5 gap-4">
          <DocsSearch docs={docsList} classes="ml-4" />
          <nav aria-label="Mobile">
            <ListNavItem
              navLinks={navLinks}
              pathname={pathname}
              onClose={onClose}
            />
          </nav>
        </div>
      </aside>
    </div>
  );
};
