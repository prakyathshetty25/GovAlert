Project Structure
Using the Next.js App Router, this structure separates the public user experience from the secure administrative dashboard, keeping your components and database logic cleanly organized.
gov-alert/
├── src/
│   ├── app/
│   │   ├── (admin)/               # Route group for govt staff
│   │   │   ├── dashboard/         # Admin metrics and issue list
│   │   │   └── layout.tsx         # Admin navbar/sidebar layout
│   │   ├── (user)/                # Route group for residents
│   │   │   ├── report/            # Issue submission form
│   │   │   ├── my-issues/         # Resident's past reports
│   │   │   └── layout.tsx         # Public-facing layout
│   │   ├── auth/                  # Supabase Auth routes (login/signup)
│   │   ├── layout.tsx             # Root layout (fonts, providers)
│   │   └── page.tsx               # Landing page
│   ├── components/
│   │   ├── ui/                    # Reusable Tailwind components (buttons, inputs)
│   │   ├── forms/                 # Report form, image uploader
│   │   └── admin/                 # Data tables, status badges, charts
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts          # Supabase browser client
│   │   │   └── server.ts          # Supabase server client
│   │   └── utils.ts               # Helper functions (date formatting, etc.)
│   └── types/                     # TypeScript definitions for DB schema
├── public/
├── tailwind.config.ts
└── package.json
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
