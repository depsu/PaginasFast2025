import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Obtenemos los nuevos datos, incluyendo el 'status'
    const { leadData, conversationText, status } = request.body;
    const ownerEmailsString = process.env.OWNER_EMAILS;

    if (!leadData || !conversationText || !ownerEmailsString) {
      return response.status(400).json({ message: 'Faltan datos para generar el resumen.' });
    }

    const recipientList = ownerEmailsString.split(',').map(email => email.trim());

    // --- LÓGICA PARA CAMBIAR EL ASUNTO ---
    let subject = `Nuevo Lead Completado: ${leadData.nombre || 'Nombre no capturado'}`;
    if (status === 'INCOMPLETO_POR_INACTIVIDAD') {
        subject = `Lead Parcial por Inactividad: ${leadData.nombre || 'Nombre no capturado'}`;
    }
    // ------------------------------------

    const { data, error } = await resend.emails.send({
      from: 'Lead Notifier <onboarding@resend.dev>',
      to: recipientList,
      subject: subject, // Usamos el asunto dinámico
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
          <h2 style="color: #333;">${subject}</h2>
          <hr>
          <h3 style="color: #555;">Datos del Cliente:</h3>
          <ul>
            <li><strong>Nombre:</strong> ${leadData.nombre}</li>
            <li><strong>Email:</strong> ${leadData.email}</li>
            <li><strong>Teléfono:</strong> ${leadData.telefono}</li>
          </ul>
          <hr>
          <h3 style="color: #555;">Transcripción de la Conversación:</h3>
          <pre style="white-space: pre-wrap; background-color: #f4f4f4; padding: 15px; border-radius: 5px; font-size: 14px;">${conversationText}</pre>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return response.status(400).json(error);
    }

    response.status(200).json(data);

  } catch (error) {
    console.error("Internal server error:", error.message);
    response.status(500).json({ message: 'Error procesando la solicitud.' });
  }
}