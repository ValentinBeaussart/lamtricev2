export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabaseClient';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = formData.get('id')?.toString();

  if (!id) {
    return new Response('ID manquant', { status: 400 });
  }

  const { error } = await supabase.from('professeurs').delete().eq('id', id);

  if (error) {
    console.error('Erreur suppression prof :', error.message);
    return new Response('Erreur suppression', { status: 500 });
  }

  return redirect('/admin/gestion-professeurs?deleted=1');
};
