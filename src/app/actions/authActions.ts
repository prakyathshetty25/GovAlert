'use server';

import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export async function citizenSignUp(prevState: unknown, formData: FormData) {
  const supabase = await createClient(); 
  
  const email = (formData.get('email') ?? '') as string;
  const password = (formData.get('password') ?? '') as string;
  const fullName = (formData.get('name') ?? '') as string;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { error: authError?.message || 'Failed to sign up.' };
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: authData.user.id,
        full_name: fullName,
        role: 'citizen',
      }
    ]);

  if (profileError) {
    return { error: `Profile Error: ${profileError.message}` };
  }

  redirect('/dashboard');
}

export async function smartLogin(prevState: unknown, formData: FormData) {
  const supabase = await createClient(); 
  
  const email = (formData.get('email') ?? '') as string;
  const password = (formData.get('password') ?? '') as string;

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { error: authError?.message || 'Invalid email or password.' };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single();

  if (profile?.role === 'admin') {
    redirect('/admin/dashboard');
  } else {
    redirect('/dashboard');
  }
}

// Google OAuth signin - used as a form action during redirect flow
export async function signInWithGoogle() {
  const supabase = await createClient();
  
  // Get the base URL from environment or use the request info
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // Send them to our callback route so we can save them to the database
      redirectTo: `${baseUrl}/auth/callback`,
    },
  });

  if (error) {
    console.error("Supabase Google Auth Error:", error.message);
    // On error with form action, we can't return state, so redirect to login with error
    redirect(`/login?error=${encodeURIComponent('Failed to initialize Google login')}`);
  }

  // Redirect to the Google login screen
  if (data.url) {
    redirect(data.url);
  }
  
  // Fallback redirect
  redirect('/login');
}