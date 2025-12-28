import CustomLink from "@/components/ui/CustomLink";
import { cn } from "@/lib/utils";

type NavItem = { href: string; title: string };

interface ListNavItemProps {
  navLinks: NavItem[];
  pathname: string;
  onClose?: () => void;
  classes?: string;
}

/**
 * Компонент списка навигации для документации
 * Используется в DocsMobileDrawer и на страницах документации
 */
export const ListNavItem = ({
  navLinks,
  pathname,
  onClose,
  classes = "text-sm text-neutral-40",
}: ListNavItemProps) => {
  // Нормализуем pathname - убираем trailing slash для корректного сравнения
  const normalizePath = (path: string) => path.replace(/\/$/, "");

  return (
    <ul className="flex flex-col items-start gap-2 px-4">
      {navLinks.map(({ href, title }) => {
        const isActive = normalizePath(href) === normalizePath(pathname);
        return (
          <li
            key={title}
            className={cn(
              "group w-full rounded-md px-2 py-[6px] max-md:px-3 transition-colors",
              isActive
                ? "bg-[rgba(166,87,255,0.20)]"
                : "hover:bg-[rgba(166,87,255,0.20)]"
            )}
          >
            <CustomLink
              href={href}
              isActive={isActive}
              handleClose={onClose}
              classes={cn(
                classes,
                // Переопределяем стили для docs: активная и hover - secondary-purple
                // Используем ! для переопределения базовых стилей из CustomLink
                isActive
                  ? "!text-secondary-purple font-semibold !hover:text-secondary-purple"
                  : "!text-white group-hover:!text-secondary-purple hover:!text-secondary-purple"
              )}
            >
              {title}
            </CustomLink>
          </li>
        );
      })}
    </ul>
  );
};
