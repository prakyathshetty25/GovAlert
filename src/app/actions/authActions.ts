'use server';

import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export async function citizenSignUp(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('name') as string;

  // 1. Create the user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    console.error('Signup Error:', authError?.message);
    return { error: authError?.message };
  }

  // 2. Save their extra details into the profiles table
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: authData.user.id, // Link to the Auth User
        full_name: fullName,
        role: 'citizen',
      }
    ]);

 if (profileError) {
    console.error('FULL ERROR:', profileError);
    return { error: `Supabase Error: ${profileError.message} (Code: ${profileError.code})` };
  }

  // 3. Redirect to their dashboard on success
  redirect('/dashboard');
}

export async function smartLogin(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 1. Authenticate the user
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { error: 'Invalid email or password.' };
  }

  // 2. Fetch their role from the profiles table
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