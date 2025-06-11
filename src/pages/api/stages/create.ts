export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabaseClient';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    const title = formData.get('title')?.toString() ?? '';
    const slug = formData.get('slug')?.toString() ?? '';
    const date = formData.get('date')?.toString() ?? '';
    const description = formData.get('description')?.toString() ?? '';
    const details = formData.get('details')?.toString() ?? '';
    const duree = formData.get('duree')?.toString() ?? '';
    const prix = formData.get('prix')?.toString() ?? '';
    const places = formData.get('places')?.toString() ?? '';
    const prerequis = formData.get('prerequis')?.toString() ?? '';
    const materiel = formData.get('materiel')?.toString() ?? '';
    const programme = formData.get('programme')?.toString()?.split('\n').filter(Boolean) ?? [];
    const prof_id = formData.get('prof_id')?.toString() ?? '';

    // ✅ Vérification ID professeur
    if (!prof_id) {
      return new Response('ID de professeur manquant.', { status: 400 });
    }

    // ✅ Téléversement image stage
    let image_url: string | null = null;
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const fileName = `${slug}-${Date.now()}`;
      const { data, error: uploadError } = await supabase.storage
        .from('images')
        .upload(`stages/${fileName}`, arrayBuffer, { contentType: file.type });

      if (uploadError) {
        console.error('Upload error:', uploadError.message);
        return new Response("Erreur en téléversant l'image.", { status: 500 });
      }

      const { data: publicUrl } = supabase.storage.from('images').getPublicUrl(`stages/${fileName}`);
      image_url = publicUrl.publicUrl;
    }

    // ✅ Insertion du stage
    const { error } = await supabase.from('stages').insert({
      title,
      slug,
      date,
      description,
      details,
      duree,
      prix,
      places,
      prerequis,
      materiel,
      programme,
      image_url,
      professeur_id: prof_id, // 🔁 Ici on utilise directement l'ID transmis
    });

    if (error) {
      console.error('Supabase error:', error.message);
      return new Response('Erreur lors de la création.', { status: 500 });
    }

    return redirect('/admin/gestion-stages');
  } catch (err) {
    console.error('[Create stage] Internal error:', err);
    return new Response('Erreur interne du serveur', { status: 500 });
  }
};
