import DiscordIcon from "@/public/icons/social/discord.svg";
import YoutubeIcon from "@/public/icons/social/youtube.svg";
import LinkedInColorIcon from "@/public/icons/social/linkedin.svg";
import TwitterIcon from "@/public/icons/social/twitter.svg";
import { links } from "./links";

export const NAV_ITEMS = [
  { title: "Features", href: "/#features" },
  { title: "Pricing", href: "/#pricing" },
  { title: "FAQ", href: "/#faq" },
  { title: "Blog", href: "/blog" },
];

export const SOCIAL_ICONS = [
  {
    Icon: DiscordIcon,
    title: "Discord",
    href: links.discord,
  },
  {
    Icon: YoutubeIcon,
    title: "Youtube",
    href: links.youtube,
  },
  {
    Icon: LinkedInColorIcon,
    title: "LinkedIn",
    href: links.linkedIn,
  },
  {
    Icon: TwitterIcon,
    title: "Twitter",
    href: links.twitter,
  },
];

export const FOOTER_SECTIONS = [
  {
    title: "Tools",
    items: [{ label: "API", href: "/docs/api" }],
  },
  {
    title: "Resources",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Docs", href: "/docs/introduction" },
      { label: "Discord", href: links.discord },
      { label: "Postiz", href: "https://postiz.com" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Pricing", href: "/#pricing" },
      { label: "Terms of service", href: "/terms-of-service" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];
