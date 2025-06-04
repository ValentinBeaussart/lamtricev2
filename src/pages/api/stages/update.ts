export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabaseClient';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    const id = formData.get('id')?.toString() ?? '';
    const slug = formData.get('slug')?.toString() ?? '';
    const file = formData.get('image') as File | null;

    const updates: any = {
      title: formData.get('title')?.toString() ?? '',
      date: formData.get('date')?.toString() ?? '',
      description: formData.get('description')?.toString() ?? '',
      details: formData.get('details')?.toString() ?? '',
      duree: formData.get('duree')?.toString() ?? '',
      prix: formData.get('prix')?.toString() ?? '',
      places: formData.get('places')?.toString() ?? '',
      prerequis: formData.get('prerequis')?.toString() ?? '',
      materiel: formData.get('materiel')?.toString() ?? '',
      programme: formData.get('programme')?.toString().split('\n').filter(Boolean),
      slug,
      professeur: {
        nom: formData.get('prof_nom')?.toString() ?? '',
        bio: formData.get('prof_bio')?.toString() ?? '',
      }
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
      updates.image = urlData.publicUrl;
      updates.professeur.image = urlData.publicUrl;
    }

    const { error } = await supabase.from('stages').update(updates).eq('id', id);

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
