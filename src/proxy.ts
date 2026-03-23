import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// NEW: The function must now be named 'proxy'
export async function proxy(request: NextRequest) {
  // 1. Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 2. Initialize the Supabase client specifically for the Proxy
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. Securely check if the user is logged in
  const { data: { user } } = await supabase.auth.getUser();

  // 4. Define which routes are locked down
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const isAdminDashboard = request.nextUrl.pathname.startsWith('/admin/dashboard');

  // 5. The Bouncer: Kick them out if they aren't logged in
  if (!user && (isDashboard || isAdminDashboard)) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 6. If they are logged in (or on a public page), let them through!
  return supabaseResponse;
}

// This tells Next.js to run this proxy on every page EXCEPT static files
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};