import DiscordIcon from "@/public/icons/social/discord.svg";
import YoutubeIcon from "@/public/icons/social/youtube.svg";
import LinkedInColorIcon from "@/public/icons/social/linkedin.svg";
import TwitterIcon from "@/public/icons/social/twitter.svg";
import { links } from "./links";
import IconOne from "@/public/icons/pricing/one.svg";
import IconGroup from "@/public/icons/pricing/group.svg";
import IconTeam from "@/public/icons/pricing/team.svg";
import {
  PricingCardType,
  AuthorFrontmatter,
  BlogPostFrontmatter,
} from "@/types/types";
import Agencies from "@/public/icons/usecases/agencies.svg";
import Creators from "@/public/icons/usecases/creators.svg";
import Experts from "@/public/icons/usecases/experts.svg";

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

export const PRICING_CARDS: PricingCardType[] = [
  {
    title: "Normal",
    theme: "purple",
    prices: [
      {
        price: "$42",
        features: "Billed annually",
      },
      {
        price: "$50",
      },
    ],
    details: [
      {
        Icon: IconOne,
        description: "3 Total avatars",
      },
      {
        Icon: IconGroup,
        description: "1 Total avatar groups",
      },
    ],
  },
  {
    title: "Team",
    theme: "orange",
    prices: [
      {
        price: "$83",
        features: "Billed annually",
      },
      {
        price: "$100",
      },
    ],
    details: [
      {
        Icon: IconOne,
        description: "7 Total avatars",
      },
      {
        Icon: IconGroup,
        description: "3 Total avatar groups",
      },
      {
        Icon: IconTeam,
        description: "Unlimited Create team permission",
      },
    ],
  },
  {
    title: "Ultra",
    theme: "blue",
    prices: [
      {
        price: "$167",
        features: "Billed annually",
      },
      {
        price: "$200",
      },
    ],
    details: [
      {
        Icon: IconOne,
        description: "20 Total avatars",
      },
      {
        Icon: IconGroup,
        description: "10 Total avatar groups",
      },
      {
        Icon: IconTeam,
        description: "Unlimited Create team permission",
      },
    ],
  },
];

export const USE_CASES = [
  {
    icon: Creators,
    title: "Content Creators",
    description: "Maximize your content’s reach and impact.",
  },
  {
    icon: Experts,
    title: "Crypto Experts",
    description: "Build trust and visibility in the fast-paced crypto space.",
  },
  {
    icon: Agencies,
    title: "Agencies",
    description: "Streamline and scale content delivery for your clients.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "How does the 7-day free trial work?",
    answer:
      "All plans come with a 7-day free trial. You can explore all features without any limitations during this period. We'll send you a reminder before your trial ends, and you won't be charged if you cancel before the trial period ends.",
  },
  {
    question: "What happens when I change plans?",
    answer:
      "When upgrading, the new plan benefits take effect immediately. We'll prorate your billing based on the remaining days in your billing cycle. When downgrading, the changes will apply at the start of your next billing cycle.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription anytime from the Subscription Management section. After cancellation, you'll still have access to your plan until the end of your current billing period.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards including Visa, Mastercard, and American Express. For annual plans, we also support invoicing for enterprise customers.",
  },
  {
    question: "Is there a difference between monthly and annual billing?",
    answer:
      "Annual billing offers a significant discount compared to monthly billing. The annual amount is charged once per year, providing you with cost savings while ensuring uninterrupted access to all features.",
  },
];

/**
 * Данные авторов
 * Хранятся отдельно от MDX файлов, чтобы frontmatter не отображался в контенте
 */
export const authorsData: Record<string, AuthorFrontmatter> = {
  david: {
    authorSlug: "David",
    description:
      "Founder of Postiz, on a mission to increase revenue for ambitious entrepreneurs",
  },
};

/**
 * Данные статей блога (frontmatter)
 * Хранятся отдельно от MDX файлов, чтобы frontmatter не отображался в контенте
 */
export const blogPostsData: Record<string, BlogPostFrontmatter> = {
  "marketing-workflow-management": {
    title: "Marketing Workflow Management Mastery for Modern Teams",
    date: "2025-12-01",
    slug: "marketing-workflow-management",
    authorSlug: "David",
    description:
      "Learn how to design, automate, and optimize marketing workflows so your team spends less time on busywork and more on strategy, creativity, and measurable ROI.",
    tags: [
      "marketing",
      "workflow management",
      "automation",
      "marketing ops",
      "postiz",
    ],
  },
  "postiz-is-on-product-hunt": {
    title: "Postiz is on Product Hunt!",
    date: "2025-11-20",
    slug: "postiz-is-on-product-hunt",
    authorSlug: "David",
    description:
      "Postiz launches on Product Hunt — support us with an upvote to help us deliver more free features and improvements.",
    tags: ["product", "announcement", "startup", "product-hunt", "postiz"],
  },
  "postiz-v1-6-7-more-social-media-platforms": {
    title: "Postiz v1.6.7 - more social media platforms",
    date: "2025-11-05",
    slug: "postiz-v1-6-7-more-social-media-platforms",
    authorSlug: "David",
    description:
      "Postiz v1.6.7 adds support for Bluesky, Mastodon, Discord, Slack, X, major team improvements, easier self-hosted deployment, and new upload options.",
    tags: ["release", "update", "postiz", "marketing-tools", "newsletter"],
  },
};
