# GrowChief Project Structure

## Overview

This document describes the complete structure of the GrowChief project, including all directories, files, and their purposes.

## Root Directory

```
grow/
├── 📄 package.json              # Dependencies and scripts
├── 📄 package-lock.json         # Locked dependency versions
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 next.config.ts            # Next.js configuration
├── 📄 next-env.d.ts             # Next.js type definitions
├── 📄 eslint.config.mjs         # ESLint configuration
├── 📄 postcss.config.mjs        # PostCSS configuration
├── 📄 README.md                 # Project documentation
├── 📄 PROJECT_PLAN.md           # Development plan
├── 📄 PROJECT_STRUCTURE.md      # This file
│
├── 📂 config/                   # Configuration files
│   └── hubspot.ts              # HubSpot configuration (if needed)
│
├── 📂 public/                   # Static assets
│   ├── 📂 icons/               # SVG icons
│   │   ├── 📂 social/          # Social media icons
│   │   ├── 📂 pricing/        # Pricing icons
│   │   └── favicon.svg
│   └── 📂 images/              # Images
│
└── 📂 src/                      # Source code
```

## Source Code Structure (`src/`)

### App Router (`src/app/`)

Next.js App Router with server components and dynamic routes:

```
src/app/
├── layout.tsx                   # Root layout with fonts and metadata
├── page.tsx                     # Home page
│
├── 📂 (site)/                   # Route group for main site
│   ├── layout.tsx              # Site layout (Header, Footer, CTA)
│   ├── page.tsx                # Home page
│   └── 📂 blog/                # Blog section
│       ├── page.tsx            # Blog listing page
│       ├── [slug]/             # Dynamic blog post
│       └── authors/[slug]/     # Author profile pages
│
├── 📂 docs/                     # Documentation section
│   ├── layout.tsx              # Docs layout (DocsHeader)
│   ├── page.tsx                # Docs home page
│   └── [slug]/                 # Dynamic doc page
│
├── 📂 auth/                     # Authentication pages
│   ├── layout.tsx              # Auth layout
│   ├── login/                  # Login page
│   ├── register/               # Registration page
│   ├── forgot-password/        # Password reset request
│   └── reset-password/         # Password reset form
│
├── 📂 api/                      # API routes
│   └── 📂 auth/                # Authentication API
│       ├── [...nextauth]/     # NextAuth.js handler
│       ├── register/           # Registration endpoint
│       ├── forgot-password/    # Password reset request
│       └── reset-password/     # Password reset handler
│
└── 📂 styles/                   # Global styles
    ├── globals.css             # Global styles + Tailwind @theme
    ├── button.css              # Button component styles
    ├── input.css               # Input component styles
    ├── pricing.css             # Pricing card styles
    └── blog.css                # Blog-specific styles
```

### Components (`src/components/`)

Organized by feature and purpose:

```
src/components/
├── 📂 blog/                     # Blog-related components
│   ├── MdxLoader.tsx           # MDX loader for blog posts
│   ├── 📂 blocks/              # Blog block components
│   │   ├── ArticleCard.tsx    # Article card component
│   │   ├── AuthorCard.tsx     # Author profile card
│   │   ├── AuthorData.tsx     # Author metadata display
│   │   ├── Related.tsx        # Related articles
│   │   └── ShareSocial.tsx    # Social sharing buttons
│   └── 📂 ui/                 # Blog UI components
│       ├── Divider.tsx
│       ├── H2.tsx, H3.tsx
│       ├── Image.tsx
│       ├── List.tsx
│       ├── P.tsx
│       └── Table.tsx
│
├── 📂 docs/                     # Documentation components
│   ├── DocsNavigation.tsx      # Docs navigation component
│   ├── DocsSearch.tsx          # Search functionality
│   ├── ExternalLinksHandler.tsx # External link handler
│   ├── ListNavItem.tsx         # Navigation list item
│   └── 📂 ui/                 # Docs UI components
│       ├── CopyableCode.tsx    # Code block with copy
│       ├── Divider.tsx
│       ├── H2.tsx, H3.tsx
│       └── P.tsx
│
├── 📂 layout/                   # Layout components
│   ├── Header.tsx              # Main site header
│   ├── DocsHeader.tsx          # Documentation header
│   ├── Footer.tsx              # Site footer
│   ├── CTA.tsx                 # Call-to-action section
│   ├── MobileDrawer.tsx        # Mobile navigation drawer
│   ├── DocsMobileDrawer.tsx    # Docs mobile drawer
│   └── SmoothAnchorScroll.tsx  # Smooth scroll handler
│
├── 📂 sections/                 # Page sections
│   └── 📂 mainPage/            # Home page sections
│       ├── Hero.tsx            # Hero section
│       ├── Features.tsx        # Features section
│       ├── UseCases.tsx       # Use cases section
│       ├── Pricing.tsx        # Pricing section
│       ├── Faq.tsx            # FAQ section
│       ├── Promo.tsx          # Promo section
│       └── MainVideo.tsx      # Video section
│
├── 📂 ui/                       # Reusable UI components
│   ├── Button.tsx              # Button component
│   ├── Input.tsx               # Input component
│   ├── AuthInput.tsx          # Auth-specific input
│   ├── CustomLink.tsx         # Custom link component
│   ├── Accordion.tsx          # Accordion component
│   ├── PricingCard.tsx        # Pricing card
│   ├── TabSwitch.tsx          # Tab switcher
│   ├── SpyEye.tsx             # Animated logo eye
│   └── AuthLogoEye.tsx        # Auth page logo
│
├── 📂 forms/                    # Form components
│   ├── LoginForm.tsx          # Login form
│   └── RegisterForm.tsx       # Registration form
│
├── 📂 providers/                # Context providers
│   └── SessionProvider.tsx    # NextAuth session provider
│
└── 📂 content/                  # MDX content files
    ├── 📂 docs/               # Documentation MDX files
    ├── 📂 blog/               # Blog post MDX files
    └── 📂 author/              # Author profile MDX files
```

### Libraries & Utilities (`src/lib/`)

```
src/lib/
├── auth.ts                     # Authentication utilities
├── blog.ts                     # Blog data and utilities
├── docs.ts                     # Documentation utilities
├── data.ts                     # Static data (nav items, etc.)
├── links.ts                    # External links configuration
├── prisma.ts                   # Prisma client instance
├── utils.ts                    # General utilities (cn, etc.)
└── handleVideoResize.ts       # Video resize handler
```

### Hooks (`src/hooks/`)

```
src/hooks/
└── useScrollLock.ts            # Scroll lock hook for modals
```

### Types (`src/types/`)

```
src/types/
├── types.ts                    # TypeScript type definitions
└── mdx.d.ts                    # MDX type declarations
```

### Generated (`src/generated/`)

```
src/generated/
└── 📂 prisma/                  # Generated Prisma client
    ├── client.ts              # Prisma client
    ├── models/                # Generated models
    └── ...
```

## Architecture

### Technology Stack

- **Next.js 16.0.8** (App Router with Server Components)
- **React 19.2.0**
- **TypeScript 5**
- **Tailwind CSS 4** (CSS-first configuration)
- **Prisma ORM** with PostgreSQL
- **NextAuth.js 4** for authentication
- **MDX** for content authoring
- **Framer Motion** & **GSAP** for animations
- **ESLint** for code quality

### Key Architectural Decisions

1. **App Router**: Using Next.js 16 App Router with Server Components for optimal performance
2. **CSS-First Tailwind**: Tailwind CSS 4 with `@theme` directive in `globals.css` (no `tailwind.config.ts`)
3. **MDX Content**: Documentation and blog posts are written in MDX for flexibility
4. **Component Organization**: Components organized by feature (blog, docs) and purpose (ui, layout)
5. **Type Safety**: Full TypeScript coverage with strict mode
6. **Server Components**: Default to Server Components, use Client Components only when needed

### Routing Structure

- **`(site)`**: Route group for main site pages (doesn't affect URL)
- **`/docs`**: Documentation section with search and navigation
- **`/blog`**: Blog section with dynamic posts and author pages
- **`/auth`**: Authentication pages (login, register, password reset)

### Styling Approach

- **Global Styles**: `globals.css` contains Tailwind theme configuration via `@theme`
- **Component Styles**: Separate CSS files for complex components (button, input, pricing)
- **Utility Classes**: Tailwind utility classes for most styling
- **Responsive Design**: Mobile-first approach with `max-md:`, `max-lg:` breakpoints

## Notes

- The project uses **Tailwind CSS v4** with CSS-first approach
- Theme configuration is in `globals.css` using `@theme` directive
- MDX files are located in `src/components/content/`
- All components are TypeScript with strict type checking
- Server Components are used by default for better performance
