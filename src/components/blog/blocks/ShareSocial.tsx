import { SOCIAL_ICONS } from "@/lib/data";

export const ShareSocial = () => {
  return (
    <div className="flex items-center gap-3">
      <p className="font-body-6 text-left">Share:</p>
      <div className="flex items-center gap-2">
        {SOCIAL_ICONS.map(({ Icon, href, title }) => (
          <a
            key={title}
            href={href}
            aria-label={title}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Icon className="h-10 w-10" />
          </a>
        ))}
      </div>
    </div>
  );
};
