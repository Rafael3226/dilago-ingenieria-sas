-- PostgreSQL/Supabase Schema

CREATE TABLE solicitudes(
	id SERIAL PRIMARY KEY,

	-- Sección 01: Información general
	fecha DATE NOT NULL,
	empresa VARCHAR(100) NOT NULL,
	contacto VARCHAR(100),
	telefono VARCHAR(20),

	-- Sección 02: Ubicación y estructura
	campo VARCHAR(100) NOT NULL,
	nombre_estructura VARCHAR(100) NOT NULL,
	tipo_estructura TEXT CHECK (tipo_estructura IN ('tuberia', 'tanque')),

	-- Campos condicionales (NULL si no aplica)
	diametro_linea VARCHAR(10),
	grado_tuberia VARCHAR(20),
	schedule VARCHAR(20),
	dim_tanque VARCHAR(20),
	grado_material VARCHAR(20),

	-- Ubicacion tuberia
	ubicacion_tuberia TEXT CHECK (ubicacion_tuberia IN ('aerea', 'enterrada')),
	proteccion_catodica TEXT CHECK (proteccion_catodica IN ('si', 'no')),

	-- Seccion 03: condiciones
	temp_max_operacion NUMERIC(6,2),
	temp_tuberia NUMERIC(6,2),
	temp_diseno NUMERIC(6,2),
	presion_max_operacion NUMERIC(8,2),
	presion_operacion NUMERIC(8,2),
	presion_diseno NUMERIC(8,2),

	estado TEXT CHECK (estado IN ('pendiente', 'en_proceso', 'completado')) DEFAULT 'pendiente',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tipo_estructura ON solicitudes(tipo_estructura);
CREATE INDEX idx_estado ON solicitudes(estado);

CREATE TABLE defectos(
	id SERIAL PRIMARY KEY,
	solicitud_id INTEGER NOT NULL,

	-- Seccion 04: Datos de la reparación
	configuracion TEXT CHECK (configuracion IN ('recta', 'codo', 'y', 't', 'pared', 'piso', 'techo', 'otro')),
	configuracion_otro VARCHAR(50),
	ubicacion_defecto TEXT CHECK (ubicacion_defecto IN ('interno', 'externo')),

	-- obstaculos
	obstaculos JSONB,
	obstaculos_distancia VARCHAR(50),

	producto TEXT CHECK (producto IN ('crudo', 'gas', 'refinado', 'agua', 'intermedios', 'otro')),
	producto_otro VARCHAR(50),
	tipo_defecto TEXT CHECK (tipo_defecto IN ('corrosion interna', 'corrosion externa', 'abolladura', 'pitting', 'grieta', 'otro')),
	tipo_defecto_otro VARCHAR(50),

	caracterizacion VARCHAR(100),
	perdida_espesor NUMERIC(5,2),
	tiempo_aseguramiento INT,
	distancia_libre INT,

	FOREIGN KEY (solicitud_id) REFERENCES solicitudes(id) ON DELETE CASCADE
);

CREATE INDEX idx_solicitud ON defectos(solicitud_id);