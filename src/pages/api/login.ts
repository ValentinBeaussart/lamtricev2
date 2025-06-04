export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabaseClient';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();  
    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';

    if (!email || !password) {
      return new Response('Email ou mot de passe manquant', { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.session) {
      console.error('[Erreur Supabase]', error?.message);
      return new Response('Email ou mot de passe incorrect', { status: 401 });
    }

    const response = redirect('/admin');

    response.headers.set(
      'Set-Cookie',
      `sb-access-token=${data.session.access_token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
    );

    return response;
  } catch (err) {
    console.error('[Erreur Interne]', err);
    return new Response('Erreur serveur', { status: 500 });
  }
};
