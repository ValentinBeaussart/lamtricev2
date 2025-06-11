import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const message = formData.get("message")?.toString();

  if (!name || !email || !message) {
    return new Response("Données incomplètes", { status: 400 });
  }

  try {
    const { error } = await resend.emails.send({
      from: "LA MATRICE <onboarding@resend.dev>",
      to: "admin@pixeldurable.fr",
      subject: `Nouveau message de ${name}`,
      replyTo: email,
      text: message,
    });

    return new Response(null, {
      status: 303,
      headers: {
        Location: "/contact?sent=1",
      },
    });
  } catch (err) {
    console.error("Erreur inattendue:", err);
    return new Response("Erreur serveur", { status: 500 });
  }
};
