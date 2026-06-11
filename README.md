# Student Dashboard — Internship Assignment

## Project Overview

Futuristic dark-themed Student Learning Dashboard built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide React icons and Supabase for data.

Features:
- Left sidebar navigation with smooth active indicator
- Responsive Bento grid with Hero, Activity heatmap and Course cards
- Server-side Supabase integration to fetch `courses`
- Framer Motion animations (staggered page load, card hover, progress animation)
- Accessible and responsive design

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (@supabase/supabase-js)
- Lucide React (icons)

## Folder Structure

See `src/` — main folders:

- `app/` — Next.js app routes and global styles
- `components/` — UI components (sidebar, dashboard, ui primitives)
- `lib/` — supabase client and data layer
- `types/` — TypeScript types

## Setup Instructions

1. Install dependencies

```bash
npm install
# or
yarn
```

2. Create a Supabase project and a `courses` table with columns:

- `id` uuid primary key
- `title` text
- `progress` integer
- `icon_name` text
- `created_at` timestamp with time zone (default now())

3. Copy `.env.example` to `.env.local` and fill in your Supabase details.

## Supabase Setup

1. Create a new project at https://app.supabase.com.
2. Open SQL editor and run:

```sql
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0,
  icon_name text,
  created_at timestamptz default now()
);
```

3. Insert sample data or use the dashboard to add rows.

## Environment Variables

Copy `.env.example` and set values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Running Locally

```bash
npm run dev
# or
yarn dev
```

Open `http://localhost:3000`.

### Production Build Check

Run a TypeScript check and production build to surface issues before deploying:

```bash
npx tsc --noEmit
npm run build
```

## Deployment to Vercel

1. Push repository to GitHub.
2. Import project on Vercel.
3. Add environment variables in Vercel dashboard (same keys as `.env`).
4. Deploy.

## Architecture Decisions

- Server Components: data fetching happens server-side using `getCourses` to keep initial HTML fully populated and SEO-friendly.
- Client Components: animation and interactive parts (Framer Motion, active nav indicator, progress animation) are implemented as client components.
- Progress animation uses transform (`scaleX`) to avoid layout shifts.

## Server Component Strategy

Fetch all course data on the server in `src/app/page.tsx` via `src/lib/getCourses.ts`. Pages remain Server Components to satisfy the assignment requirements.

## Framer Motion Strategy

- Parent container uses `staggerChildren` for page load animations.
- Cards animate opacity and y with spring physics.
- Hover interactions animate `transform` only (scale).
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
