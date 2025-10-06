import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ownerEmailsString = process.env.OWNER_EMAILS;

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { phone, plan } = request.body;

    if (!phone || !plan) {
      return response.status(400).json({ message: 'El teléfono y el plan son requeridos.' });
    }

    const recipientList = ownerEmailsString.split(',').map(e => e.trim());

    await resend.emails.send({
      from: 'Interesado en Plan <onboarding@resend.dev>',
      to: recipientList,
      subject: `Nuevo interesado en el Plan: ${plan}`,
      html: `
        <h2>Nuevo Lead desde los Planes</h2>
        <p>Un cliente ha dejado su número de teléfono para ser contactado.</p>
        <p><strong>Plan de Interés:</strong> ${plan}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p>Se le ha redirigido a WhatsApp para continuar la conversación.</p>
      `,
    });

    return response.status(200).json({ message: 'Correo enviado exitosamente.' });

  } catch (error) {
    console.error("Error al enviar correo del plan:", error);
    return response.status(500).json({ message: 'Error en el servidor.' });
  }
}