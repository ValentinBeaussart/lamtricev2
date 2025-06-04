export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabaseClient';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = formData.get('id')?.toString() ?? '';
  const slug = formData.get('slug')?.toString() ?? '';
  const file = formData.get('image') as File | null;

  const updates = {
    nom: formData.get('nom')?.toString() ?? '',
    specialite: formData.get('specialite')?.toString() ?? '',
    description: formData.get('description')?.toString() ?? '',
    formation: formData.get('formation')?.toString() ?? '',
    approche: formData.get('approche')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    telephone: formData.get('telephone')?.toString() ?? '',
    cours: formData.get('cours')?.toString().split('\n').filter(Boolean) ?? [],
  };

  if (file && file.size > 0) {
    const buffer = await file.arrayBuffer();
    const fileName = `${slug}-${Date.now()}`;
    const { data, error: uploadError } = await supabase.storage
      .from('images')
      .upload(`professeurs/${fileName}`, buffer, { contentType: file.type });

    if (uploadError) {
      console.error('[Upload error]', uploadError.message);
    } else {
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(`professeurs/${fileName}`);
      updates['image_url'] = urlData.publicUrl;
    }
  }

  const { error } = await supabase.from('professeurs').update(updates).eq('id', id);

  if (error) {
    console.error('[Update error]', error.message);
    return new Response('Erreur de mise à jour', { status: 500 });
  }

  return redirect('/admin/gestion-professeurs?updated=1');
};
