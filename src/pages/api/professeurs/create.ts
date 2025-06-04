export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabaseClient';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    const nom = formData.get('nom')?.toString() ?? '';
    const slug = formData.get('slug')?.toString() ?? '';
    const specialite = formData.get('specialite')?.toString() ?? '';
    const description = formData.get('description')?.toString() ?? '';
    const formation = formData.get('formation')?.toString() ?? '';
    const approche = formData.get('approche')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const telephone = formData.get('telephone')?.toString() ?? '';
    const cours = formData.get('cours')?.toString().split('\n').filter(Boolean) ?? [];

    let image_url: string | null = null;

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const fileName = `${slug}-${Date.now()}`;
      const { data, error: uploadError } = await supabase.storage
        .from('images')
        .upload(`professeurs/${fileName}`, arrayBuffer, {
          contentType: file.type,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError.message);
        return new Response('Erreur en téléversant la photo.', { status: 500 });
      }

      const { data: publicUrl } = supabase.storage.from('images').getPublicUrl(`professeurs/${fileName}`);
      image_url = publicUrl.publicUrl;
    }

    const { error } = await supabase.from('professeurs').insert({
      slug,
      nom,
      specialite,
      description,
      formation,
      approche,
      email,
      telephone,
      cours,
      image_url,
    });

    if (error) {
      console.error('Supabase error:', error.message);
      return new Response('Erreur lors de la création.', { status: 500 });
    }

    return redirect('/admin');
  } catch (err) {
    console.error('[Create professeur] Internal error:', err);
    return new Response('Erreur interne du serveur', { status: 500 });
  }
};
