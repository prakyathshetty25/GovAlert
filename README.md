<<<<<<< HEAD
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
=======
Project Structure
Using the Next.js App Router, this structure separates the public user experience from the secure administrative dashboard, keeping your components and database logic cleanly organized.
<img width="691" height="592" alt="Screenshot from 2026-03-12 22-30-26" src="https://github.com/user-attachments/assets/d7d7086d-1875-409f-9ec7-31eb4068a4a8" />

Step-by-Step Guide
Step 1: Project Initialization
Initialize your Next.js project with Tailwind CSS configured: npx create-next-app@latest my-app --typescript --tailwind --eslint.

Install the necessary Supabase packages: npm install @supabase/supabase-js @supabase/ssr.

Set up your environment variables (.env.local) with your Supabase Project URL and Anon Key.

Step 2: Supabase Database & Storage Setup
Database Schema: Create tables in Supabase for profiles (mapping to Auth users) and issues. The issues table should include columns like title, description, category (pothole, litter), status (open, in-progress, resolved), latitude, longitude, and image_url.

Storage: Create a public Supabase Storage bucket called issue-photos to handle resident uploads.

Row Level Security (RLS): Configure RLS policies so residents can only create issues and view their own, while admin users (government staff) can view and update all issues.

Step 3: Authentication
Build a login/signup flow in the src/app/auth/ directory using @supabase/ssr.

Implement role-based access control (RBAC). You can do this by adding a role column (e.g., 'resident', 'admin') to your profiles table.

Create middleware (src/middleware.ts) to protect the /(admin) route group, ensuring only authenticated staff can access the dashboard.

Step 4: Build the Resident Portal (Frontend)
Reporting Form: Build a multi-step form or a single comprehensive form in /(user)/report.

Image Upload: Integrate a file input that uploads the image to your Supabase issue-photos bucket, retrieves the public URL, and attaches that URL to the database insert.

Location: Use the browser's Geolocation API to grab coordinates automatically when a user reports an issue.

Step 5: Build the Admin Dashboard (Frontend)
Issue Feed: Fetch all issues from Supabase and display them in a Tailwind-styled data table or Kanban board.

Status Management: Build dropdowns that allow staff to change an issue's status from "Pending" to "In Progress" to "Resolved," triggering a database update.

Metrics: Create a simple analytics section (e.g., total open issues, average resolution time) to give government staff a top-level view of community performance.
>>>>>>> 9c1209b36f21a2de71463dddbc5b02453ba115e3
