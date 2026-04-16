import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return new Response(
        JSON.stringify({ error: "Content-Type debe ser application/json" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await request.json();
    console.log("Datos para email:", JSON.stringify(data, null, 2));

    // Verificar variables de entorno
    const sendGridApiKey = import.meta.env.SENDGRID_API_KEY;
    const emailDestino = import.meta.env.EMAIL_DESTINO;
    
    console.log("Config email:", {
      hasApiKey: !!sendGridApiKey,
      emailDestino: emailDestino
    });

    if (!sendGridApiKey || !emailDestino) {
      return new Response(
        JSON.stringify({ error: "Faltan variables de entorno para email" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Formatear el contenido del correo
    const htmlContent = generarHTMLCorreo(data);

    // Enviar correo usando SendGrid API
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sendGridApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: emailDestino }],
          subject: `Nueva Solicitud de Reparación - ${data.empresa}`
        }],
        from: { 
          email: "noreply@dilago.com",
          name: "Sistema de Solicitudes Dilago"
        },
        content: [{
          type: "text/html",
          value: htmlContent
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error SendGrid:", errorText);
      return new Response(
        JSON.stringify({ error: "Error enviando correo", details: errorText }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Correo enviado exitosamente");
    return new Response(
      JSON.stringify({ success: true, message: "Correo enviado" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error en API de email:", error);
    return new Response(
      JSON.stringify({ error: "Error interno", details: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

function generarHTMLCorreo(data: any): string {
  const defectosHTML = data.defectos && data.defectos.length > 0 
    ? data.defectos.map((d: any, i: number) => `
        <tr style="background-color: ${i % 2 === 0 ? '#f9f9f9' : '#ffffff'};">
          <td style="padding: 8px; border: 1px solid #ddd;">${i + 1}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${d.configuracion || '-'}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${d.ubicacion_defecto || '-'}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${d.tipo_defecto || '-'}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${d.caracterizacion || '-'}</td>
        </tr>
      `).join('')
    : '<tr><td colspan="5" style="padding: 8px; border: 1px solid #ddd; text-align: center;">No se registraron defectos</td></tr>';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nueva Solicitud de Reparación</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #0047AB; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Nueva Solicitud de Reparación</h1>
        <p style="margin: 5px 0 0 0;">Sistema de Gestión de Dilago Ingeniería SAS</p>
      </div>

      <div style="padding: 20px; background-color: #f5f5f5;">
        <h2 style="color: #0047AB; border-bottom: 2px solid #0047AB; padding-bottom: 5px;">Información General</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 30%;">Fecha:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.fecha}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Empresa:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.empresa}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Contacto:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.contacto || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Teléfono:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.telefono || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Campo:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.campo || '-'}</td>
          </tr>
        </table>
      </div>

      <div style="padding: 20px;">
        <h2 style="color: #0047AB; border-bottom: 2px solid #0047AB; padding-bottom: 5px;">Datos de la Estructura</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 30%;">Nombre Estructura:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.nombre_estructura || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Tipo Estructura:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.tipo_estructura || '-'}</td>
          </tr>
          ${data.diametro_linea ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Diámetro Línea:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.diametro_linea}</td>
          </tr>` : ''}
          ${data.grado_tuberia ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Grado Tubería:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.grado_tuberia}</td>
          </tr>` : ''}
          ${data.dim_tanque ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Dimensiones Tanque:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.dim_tanque}</td>
          </tr>` : ''}
        </table>
      </div>

      <div style="padding: 20px; background-color: #f5f5f5;">
        <h2 style="color: #0047AB; border-bottom: 2px solid #0047AB; padding-bottom: 5px;">Defectos Registrados</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #0047AB; color: white;">
              <th style="padding: 8px; border: 1px solid #ddd;">#</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Configuración</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Ubicación</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Tipo Defecto</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Caracterización</th>
            </tr>
          </thead>
          <tbody>
            ${defectosHTML}
          </tbody>
        </table>
      </div>

      <div style="padding: 20px; text-align: center; background-color: #f0f0f0; border-top: 2px solid #0047AB;">
        <p style="margin: 0; color: #666;">Este correo fue generado automáticamente por el Sistema de Solicitudes de Dilago Ingeniería SAS</p>
        <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">Fecha de envío: ${new Date().toLocaleString('es-CO')}</p>
      </div>
    </body>
    </html>
  `;
}
