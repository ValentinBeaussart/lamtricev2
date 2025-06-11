export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabaseClient';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();

    const id = formData.get('id')?.toString() ?? '';
    const slug = formData.get('slug')?.toString() ?? '';
    const prof_id = formData.get('prof_id')?.toString() ?? '';
    const file = formData.get('image') as File | null;

    // Vérifications basiques
    if (!id || !prof_id) {
      return new Response('Identifiant manquant.', { status: 400 });
    }

    const updates: Record<string, any> = {
      title: formData.get('title')?.toString() ?? '',
      date: formData.get('date')?.toString() ?? '',
      description: formData.get('description')?.toString() ?? '',
      details: formData.get('details')?.toString() ?? '',
      duree: formData.get('duree')?.toString() ?? '',
      prix: formData.get('prix')?.toString() ?? '',
      places: formData.get('places')?.toString() ?? '',
      prerequis: formData.get('prerequis')?.toString() ?? '',
      materiel: formData.get('materiel')?.toString() ?? '',
      programme: formData.get('programme')?.toString()?.split('\n').filter(Boolean) ?? [],
      slug,
      professeur_id: prof_id, // 🔁 mise à jour de la clé étrangère
    };

    if (file && file.size > 0) {
      const buffer = await file.arrayBuffer();
      const fileName = `stages/${slug}-${Date.now()}`;
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, buffer, {
          contentType: file.type,
        });

      if (uploadError) {
        console.error('[Upload error]', uploadError.message);
        return new Response('Erreur lors du téléversement de l’image.', { status: 500 });
      }

      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);
      updates.image_url = urlData.publicUrl;
    }

    const { error } = await supabase
      .from('stages')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('[Update stage error]', error.message);
      return new Response('Erreur de mise à jour', { status: 500 });
    }

    return redirect('/admin/gestion-stages?updated=1');
  } catch (err) {
    console.error('[Update stage error]', err);
    return new Response('Erreur serveur', { status: 500 });
  }
};
