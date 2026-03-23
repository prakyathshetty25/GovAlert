import { createClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // Handle OAuth errors
  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  // Handle successful OAuth callback
  if (code) {
    const supabase = await createClient();
    
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (exchangeError) {
      console.error('OAuth exchange error:', exchangeError);
      return NextResponse.redirect(
        new URL('/login?error=Authentication%20failed', request.url)
      );
    }

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check if user profile exists in the database
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    // If profile doesn't exist, create one for new Google sign-ups
    if (!profile) {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
            role: 'citizen',
          }
        ]);

      if (insertError) {
        console.error('Profile creation error:', insertError);
        return NextResponse.redirect(
          new URL('/login?error=Profile%20creation%20failed', request.url)
        );
      }
    }

    // Redirect based on user role
    if (profile?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.redirect(new URL('/login', request.url));
}
