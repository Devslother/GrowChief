"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Author } from "@/types/types";
import LinkedInColorIcon from "@/public/icons/social/linkedin.svg";
import TwitterIcon from "@/public/icons/social/twitter.svg";
import { links } from "@/lib/links";

interface AuthorCardProps {
  author: Author;
  href?: string;
}

export const AuthorCard = ({ author, href }: AuthorCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <div
      className={`author-card-border mx-auto w-200 max-lg:w-full ${
        href ? "cursor-pointer" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="flex flex-row items-center justify-between gap-[38px] rounded-4xl bg-neutral-80 px-9 py-[42px] max-md:flex-col max-md:gap-5 max-md:px-5 max-md:py-8">
        <div className="shrink-0">
          <Image
            src={author.avatar}
            alt={author.name}
            width={140}
            height={140}
            className="h-[140px] w-[140px] rounded-full object-cover max-md:h-[100px] max-md:w-[100px]"
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-row items-center gap-2 max-md:flex-col">
            <h3 className="font-headline-4 text-left max-md:text-center">
              {author.name}
            </h3>

            <div
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={links.linkedIn}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
                onClick={(e) => e.stopPropagation()}
              >
                <LinkedInColorIcon className="h-9 w-9" />
              </a>
              <a
                href={links.twitter}
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
                onClick={(e) => e.stopPropagation()}
              >
                <TwitterIcon className="h-9 w-9" />
              </a>
            </div>
          </div>

          {author.description && (
            <p className="font-body-4 text-left">
              &ldquo;{author.description}&rdquo;
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
