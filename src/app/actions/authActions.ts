'use server';

import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export async function citizenSignUp(prevState: any, formData: FormData) {
  const supabase = await createClient(); // NEW: Initialize the cookie-aware client
  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('name') as string;

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

export async function smartLogin(prevState: any, formData: FormData) {
  const supabase = await createClient(); // NEW: Initialize the cookie-aware client
  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 1. Authenticate the user (This now sets the cookie automatically!)
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    // We now show the EXACT error (e.g., "Invalid login credentials")
    return { error: authError?.message || 'Invalid email or password.' };
  }

  // 2. Fetch their role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single();

  // 3. Route them based on their role
  if (profile?.role === 'admin') {
    redirect('/admin/dashboard');
  } else {
    redirect('/dashboard');
  }
}