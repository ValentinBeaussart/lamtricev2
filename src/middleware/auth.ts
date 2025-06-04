import { defineMiddleware } from 'astro/middleware';
import { createSupabaseServerClient } from '../lib/supabaseClient';

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith('/admin')) {
    const supabase = createSupabaseServerClient(context.cookies);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return context.redirect('/admin/login');
    }
  }

  return next();
});


