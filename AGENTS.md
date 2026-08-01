<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 1. Project Stack & Architecture
- **Ecosystem:** Next.js (App Router), TypeScript, Tailwind CSS, Supabase (PostgreSQL).
- **Core Features:** Progressive Web App (PWA) manifest configurations, offline data persistence via IndexDB, and hardware telemetry web socket parsing.
- **Directory Layout:** Restrict all routing, layouts, and API boundaries strictly inside the `/app` directory. Use `/components/ui` for primitives, `/components/features` for domain components, and `/actions` for Next.js Server Actions.

## 2. Next.js Specific Conventions
- **Server Actions:** Mark all Server Actions with a top-level `"use server"` directive. Ensure parameters and return types are entirely serializable.
- **Server vs Client Components:** Default all components to Server Components. Only append `"use client"` if using React state, lifecycle hooks (`useEffect`), or browser-exclusive APIs.
- **Data Fetching:** Leverage native `async/await` directly inside Server Components and utilize Next.js fetch caching mechanisms over external fetching hooks.
- **Metadata Management:** Every page file must explicitly export a statically defined or dynamically generated `metadata` object of type `Metadata`.

## 3. Deployment & Constraints
- **Build Safety:** Never use dynamic runtime configurations that break Static Site Generation (SSG) unless explicitly requested.
- **Environment Variables:** Prefix any token required by the frontend client with `NEXT_PUBLIC_`. Keep secret keys strictly isolated to the server context.
