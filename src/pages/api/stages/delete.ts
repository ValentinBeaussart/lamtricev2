export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabaseClient';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = formData.get('id')?.toString();

  if (!id) {
    return new Response('ID manquant', { status: 400 });
  }

  const { error } = await supabase.from('stages').delete().eq('id', id);

  if (error) {
    console.error('Erreur suppression stage :', error.message);
    return new Response('Erreur suppression', { status: 500 });
  }

  return redirect('/admin/gestion-stages?deleted=1');
};
