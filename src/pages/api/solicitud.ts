import type { APIRoute } from "astro";

// Función de supabase para conectar a la bd
import { createClient } from "@supabase/supabase-js";

// Exporta una función POST con el request de los datos
export const POST: APIRoute = async ({ request }) => {

  // verifica que el request sea de tipo json
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return new Response(
        JSON.stringify({ error: "Content-Type debe ser application/json" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // declarar variable data y asignarle el json devuelto
    const data = await request.json();
    console.log("Datos recibidos:", JSON.stringify(data, null, 2));

    // verifica que los campos empresa y fecha existan
    if (!data.empresa || !data.fecha) {
      return new Response(
        JSON.stringify({ error: "empresa y fecha son requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // declara la conexión a la base de datos supabase mediante las variables de entorno
    console.log("Variables de entorno:", {
      url: import.meta.env.SUPABASE_URL,
      hasKey: !!import.meta.env.SUPABASE_SERVICE_ROLE_KEY
    });
    
    const supabase = createClient(
      import.meta.env.SUPABASE_URL || "",
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );

    // inserta los datos en la tabla solicitudes 
    const { data: solicitud, error: solicitudError } = await supabase
      .from("solicitudes")
      .insert({
        fecha: data.fecha,
        empresa: data.empresa,
        contacto: data.contacto || null,
        telefono: data.telefono || null,
        campo: data.campo || null,
        nombre_estructura: data.nombre_estructura || null,
        tipo_estructura: data.tipo_estructura || null,
        diametro_linea: data.diametro_linea || null,
        grado_tuberia: data.grado_tuberia || null,
        schedule: data.schedule || null,
        dim_tanque: data.dim_tanque || null,
        grado_material: data.grado_material || null,
        ubicacion_tuberia: data.ubicacion_tuberia || null,
        proteccion_catodica: data.proteccion_catodica || null,
        temp_max_operacion: data.temp_max_operacion || null,
        temp_tuberia: data.temp_tuberia || null,
        temp_diseno: data.temp_diseno || null,
        presion_max_operacion: data.presion_max_operacion || null,
        presion_operacion: data.presion_operacion || null,
        presion_diseno: data.presion_diseno || null,
      })
      .select()
      .single();

    // si la inserción tiene algún error, devolverá error de servidor (500)
    if (solicitudError) {
      console.error("Error insertando solicitud:", solicitudError);
      return new Response(
        JSON.stringify({ error: "Error al guardar la solicitud" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // si hay defectos, insertarlos en la tabla defectos
    const defectos = data.defectos || [];
    if (defectos.length > 0 && solicitud?.id) {
      const defectosConSolicitudId = defectos.map((d: Record<string, unknown>) => ({
        solicitud_id: solicitud.id,
        configuracion: d.configuracion || null,
        configuracion_otro: d.configuracion_otro || null,
        ubicacion_defecto: d.ubicacion_defecto || null,
        obstaculos: d.obstaculos || null,
        obstaculos_distancia: d.obstaculos_distancia || null,
        producto: d.producto || null,
        producto_otro: d.producto_otro || null,
        tipo_defecto: d.tipo_defecto || null,
        tipo_defecto_otro: d.tipo_defecto_otro || null,
        caracterizacion: d.caracterizacion || null,
        perdida_espesor: d.perdida_espesor || null,
        tiempo_aseguramiento: d.tiempo_aseguramiento || null,
        distancia_libre: d.distancia_libre || null,
      }));

      const { error: defectosError } = await supabase
        .from("defectos")
        .insert(defectosConSolicitudId);

      // valida si hay algún error al ingresar los defectos y devuelve error en el servidor(500)
      if (defectosError) {
        console.error("Error insertando defectos:", defectosError);
        return new Response(
          JSON.stringify({ error: "Error al guardar los defectos" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // devuelve la respuesta exitosa si ambos elementos pudieron ser ingresados a la bd
    return new Response(
      JSON.stringify({ success: true, id: solicitud?.id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  // si el error es con la api directamente, enviará también un error de servidor (500) pero mostrará el mensaje en la consola de que es falla de la api
  } catch (error) {
    console.error("Error en API:", error);
    return new Response(
      JSON.stringify({ error: "Error interno" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
