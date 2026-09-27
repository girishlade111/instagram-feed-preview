# Instagram Feed Preview

A free, privacy-first tool that shows exactly how your Instagram posts and reels will look in your profile feed **before** you publish. Drag in your images, arrange them, and preview the grid — all locally in your browser, nothing uploaded anywhere.

**Built by Girish Lade** — https://ladestack.in

## Features

- **Drag-and-drop image upload** — drop photos straight onto the phone mockup or use the upload zone.
- **Realistic Instagram UI mockup** — posts and reels rendered in a faithful Instagram-style feed inside a mobile frame.
- **Feed grid preview** — rearrange your 3-column profile grid to plan the perfect aesthetic before posting.
- **Reorder with drag & drop** — sort posts to see how the grid layout changes (dnd-kit powered).
- **Reels support** — preview reel cards alongside regular posts, with a feed tabs switcher.
- **Local persistence** — posts and reels are stored in the browser's IndexedDB, so your draft feed survives reloads.
- **Empty state onboarding** — guided first-run experience when you have no content yet.
- **Dark / light mode** — theme toggle that matches Instagram's look either way.
- **Toast notifications** — feedback for uploads and actions.
- **Top & bottom navigation** — mobile-style nav bars completing the Instagram illusion.
- **Fully offline / private** — no account, no server, no tracking; your images never leave your device.

## Tech stack

- Next.js 15 (App Router, static export), React 19, TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives) for styling
- dnd-kit — sortable drag-and-drop feed grid
- react-dropzone — file upload handling
- idb — IndexedDB persistence layer
- next-themes — dark/light mode
- lucide-react — icons
- sonner — toasts

## Quick start

```bash
npm install
npm run dev     # http://localhost:3000
```

Build a production bundle:

```bash
npm run build    # static export -> out/
npm start        # serves the production build
```

## Project structure

```
instagram-feed-preview/
├── app/
│   ├── page.tsx          # main page: phone frame + drag-drop + feed
│   ├── layout.tsx        # root layout, fonts, metadata
│   └── globals.css       # global styles
├── components/
│   ├── instagram-feed.tsx   # feed grid container
│   ├── instagram-post.tsx   # post card
│   ├── reel-post.tsx        # reel card
│   ├── drag-drop-zone.tsx   # drag target wrapper
│   ├── image-dropzone.tsx   # upload dropzone
│   ├── upload-zone.tsx      # upload area
│   ├── empty-state.tsx      # first-run onboarding
│   ├── feed-tabs.tsx        # posts / reels tab switcher
│   ├── top-nav.tsx / bottom-nav.tsx  # mobile nav bars
│   ├── theme-provider.tsx   # theme context
│   └── ui/               # shadcn/ui primitives (toast, etc.)
├── utils/
│   ├── db.ts             # IndexedDB (idb) persistence: posts + reels
│   ├── storage.ts        # storage helpers
│   └── image.ts          # image processing helpers
├── lib/utils.ts          # class-name / formatting utilities
├── types.ts              # shared TypeScript types
└── public/               # placeholder images & logo
```

## Environment variables

None. The app is fully client-side; there is no backend, no API keys, and no database to configure.

## Deployment

Statically exported (`output: 'export'` in `next.config.mjs`) — host the `out/` directory anywhere:

- **GitHub Pages** (live): `out/` pushed to the `gh-pages` branch → https://girishlade111.github.io/instagram-feed-preview/
- Any static host (Vercel, Netlify, Cloudflare Pages) works with `npm run build`.

> Note: `next.config.mjs` sets `basePath: '/instagram-feed-preview'` for the GitHub Pages subpath. Remove `basePath` (and the `output: 'export'` override if you want SSR) when deploying to a root domain or Vercel.

## Notes

- Next.js bumped from 15.2.4 → 15.2.8 (patches CVE-2025-55182 React2Shell and related advisories).
- Originally generated with v0; converted to a static export so it can be hosted for free anywhere.

## Credit

Built by Girish Lade — https://ladestack.in
