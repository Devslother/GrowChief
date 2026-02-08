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
 * Navigation list component for documentation
 * Used in DocsMobileDrawer and on documentation pages
 */
export const ListNavItem = ({
  navLinks,
  pathname,
  onClose,
  classes = "text-sm text-neutral-40",
}: ListNavItemProps) => {
  // Normalize pathname - remove trailing slash for correct comparison
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
                // Override styles for docs: active and hover - secondary-purple
                // Use ! to override base styles from CustomLink
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
