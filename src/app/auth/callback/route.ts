import { createClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const callbackUrl = new URL(request.url);
  const code = callbackUrl.searchParams.get('code');
  const error = callbackUrl.searchParams.get('error');

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error)}`, callbackUrl)
    );
  }

  const supabase = await createClient();

  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (exchangeError) {
      console.error('OAuth exchange error:', exchangeError);
      return NextResponse.redirect(
        new URL('/login?error=Authentication%20failed', callbackUrl)
      );
    }
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData?.user;

  if (userError || !user) {
    console.error('Unable to get user after OAuth callback:', userError);
    return NextResponse.redirect(new URL('/login?error=Authentication%20failed', callbackUrl));
  }

  let role = 'citizen';
  let roleColumnExists = true;

  const profileQuery = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileQuery.error) {
    if (profileQuery.error.code === 'PGRST204') {
      // Role column missing in schema; use fallback
      roleColumnExists = false;
      console.warn('profiles.role column missing; continuing without role-based redirect.');
    } else {
      console.error('Profile lookup error:', profileQuery.error);
    }
  } else if (profileQuery.data?.role) {
    role = profileQuery.data.role;
  }

  // Create profile records for new users
  if (!profileQuery.data) {
    const profileInsert = {
      id: user.id,
      full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
      ...(roleColumnExists ? { role: 'citizen' } : {}),
    };

    const insertResult = await supabase
      .from('profiles')
      .insert([profileInsert]);

    if (insertResult.error) {
      if (insertResult.error.code === 'PGRST204' && roleColumnExists) {
        // Retry once without role column if schema doesn't have role
        roleColumnExists = false;
        const retryResult = await supabase.from('profiles').insert([
          { id: user.id, full_name: user.user_metadata?.full_name || user.email?.split('@')[0] },
        ]);

        if (retryResult.error) {
          console.error('Profile creation retry error:', retryResult.error);
          return NextResponse.redirect(new URL('/login?error=Profile%20creation%20failed', callbackUrl));
        }
      } else {
        console.error('Profile creation error:', insertResult.error);
        return NextResponse.redirect(new URL('/login?error=Profile%20creation%20failed', callbackUrl));
      }
    }
  }

  if (role === 'admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', callbackUrl));
  }

  return NextResponse.redirect(new URL('/dashboard', callbackUrl));
}
