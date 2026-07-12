/*==============================================================
  SCRIPT 03 - DATOS DE EJEMPLO Y PRUEBAS
  PROYECTO : MASKOTEKA - GESTIÓN DE CITAS VETERINARIAS
  MOTOR    : Microsoft SQL Server
==============================================================*/

USE BD_MASKOTEKA;
GO

SET NOCOUNT ON;
SET XACT_ABORT ON;
GO

/*==============================================================
  1. LIMPIEZA DE DATOS PARA PERMITIR REEJECUCIÓN
==============================================================*/
DELETE FROM dbo.TB_DOCUMENTO_MASCOTA;
DELETE FROM dbo.TB_VACUNA_MASCOTA;
DELETE FROM dbo.TB_CONSULTA_MASCOTA;
DELETE FROM dbo.TB_PAGO;
DELETE FROM dbo.TB_CITA_ESTADO_HISTORIAL;
DELETE FROM dbo.TB_CITA;
DELETE FROM dbo.TB_DISPONIBILIDAD;
DELETE FROM dbo.TM_SERVICIO;
DELETE FROM dbo.TM_VETERINARIO;
DELETE FROM dbo.TM_MASCOTA;
DELETE FROM dbo.TM_ESPECIE;
DELETE FROM dbo.TM_USUARIO;
DELETE FROM dbo.TM_ROL;
GO

DBCC CHECKIDENT ('dbo.TB_DOCUMENTO_MASCOTA', RESEED, 0);
DBCC CHECKIDENT ('dbo.TB_VACUNA_MASCOTA', RESEED, 0);
DBCC CHECKIDENT ('dbo.TB_CONSULTA_MASCOTA', RESEED, 0);
DBCC CHECKIDENT ('dbo.TB_PAGO', RESEED, 0);
DBCC CHECKIDENT ('dbo.TB_CITA_ESTADO_HISTORIAL', RESEED, 0);
DBCC CHECKIDENT ('dbo.TB_CITA', RESEED, 0);
DBCC CHECKIDENT ('dbo.TB_DISPONIBILIDAD', RESEED, 0);
DBCC CHECKIDENT ('dbo.TM_SERVICIO', RESEED, 0);
DBCC CHECKIDENT ('dbo.TM_VETERINARIO', RESEED, 0);
DBCC CHECKIDENT ('dbo.TM_MASCOTA', RESEED, 0);
DBCC CHECKIDENT ('dbo.TM_ESPECIE', RESEED, 0);
DBCC CHECKIDENT ('dbo.TM_USUARIO', RESEED, 0);
DBCC CHECKIDENT ('dbo.TM_ROL', RESEED, 0);
GO

/*==============================================================
  2. DATOS MAESTROS
==============================================================*/
INSERT INTO dbo.TM_ROL (NOMBRE, DESCRIPCION)
VALUES
('ADMINISTRADOR', 'Gestiona servicios, agenda y citas'),
('CLIENTE', 'Propietario de una o más mascotas');
GO

INSERT INTO dbo.TM_ESPECIE (NOMBRE)
VALUES ('Perro'), ('Gato'), ('Hámster'), ('Conejo'), ('Ave');
GO

DECLARE @ID_ROL_ADMIN INT =
(
    SELECT ID_ROL
    FROM dbo.TM_ROL
    WHERE NOMBRE = 'ADMINISTRADOR'
);

DECLARE @ID_ROL_CLIENTE INT =
(
    SELECT ID_ROL
    FROM dbo.TM_ROL
    WHERE NOMBRE = 'CLIENTE'
);

INSERT INTO dbo.TM_USUARIO
(
    ID_ROL, NOMBRES, APELLIDOS, TIPO_DOCUMENTO, NUMERO_DOCUMENTO,
    TELEFONO, CORREO, CLAVE, DIRECCION
)
VALUES
(
    @ID_ROL_ADMIN, 'Ana', 'Torres Medina', 'DNI', '44556677',
    '999111222', 'admin@maskoteka.pe', '$2b$12$HASH_DEMO_ADMIN',
    'San Juan de Lurigancho'
),
(
    @ID_ROL_CLIENTE, 'Victor', 'Saravia Tinco', 'DNI', '70112233',
    '987654321', 'victor.saravia@gmail.com', '$2b$12$HASH_DEMO_CLIENTE1',
    'Lima'
),
(
    @ID_ROL_CLIENTE, 'María', 'López Ramos', 'DNI', '73334444',
    '955444333', 'maria.lopez@gmail.com', '$2b$12$HASH_DEMO_CLIENTE2',
    'San Juan de Lurigancho'
);
GO

/*==============================================================
  3. MASCOTAS USANDO IDS OBTENIDOS DE LA BASE
==============================================================*/
DECLARE @ID_USUARIO_VICTOR INT =
(
    SELECT ID_USUARIO
    FROM dbo.TM_USUARIO
    WHERE CORREO = 'victor.saravia@gmail.com'
);

DECLARE @ID_USUARIO_MARIA INT =
(
    SELECT ID_USUARIO
    FROM dbo.TM_USUARIO
    WHERE CORREO = 'maria.lopez@gmail.com'
);

DECLARE @ID_ESPECIE_PERRO INT =
(
    SELECT ID_ESPECIE
    FROM dbo.TM_ESPECIE
    WHERE NOMBRE = 'Perro'
);

DECLARE @ID_ESPECIE_GATO INT =
(
    SELECT ID_ESPECIE
    FROM dbo.TM_ESPECIE
    WHERE NOMBRE = 'Gato'
);

DECLARE @ID_ESPECIE_HAMSTER INT =
(
    SELECT ID_ESPECIE
    FROM dbo.TM_ESPECIE
    WHERE NOMBRE = 'Hámster'
);

IF @ID_USUARIO_VICTOR IS NULL OR @ID_USUARIO_MARIA IS NULL
    THROW 51010, 'No se encontraron los usuarios de ejemplo.', 1;

INSERT INTO dbo.TM_MASCOTA
(
    ID_USUARIO, ID_ESPECIE, NOMBRE, RAZA, SEXO, FECHA_NACIMIENTO,
    PESO_KG, COLOR, ESTERILIZADO, MICROCHIP, FOTO_URL, OBSERVACIONES
)
VALUES
(
    @ID_USUARIO_VICTOR, @ID_ESPECIE_PERRO, 'Alice', 'Mestiza', 'H',
    '2022-08-25', 15.00, 'Blanco con marrón', 1,
    '123456789012345', 'https://em-content.zobj.net/source/microsoft/379/dog-face_1f436.png',
    'Alergia leve al pollo. Paciente tranquila.'
),
(
    @ID_USUARIO_VICTOR, @ID_ESPECIE_PERRO, 'Milo', 'Mestizo', 'M',
    '2021-06-11', 12.50, 'Blanco con marrón', 0,
    NULL, 'https://em-content.zobj.net/source/microsoft/379/dog-face_1f436.png',
    'Requiere control de vacunas.'
),
(
    @ID_USUARIO_VICTOR, @ID_ESPECIE_HAMSTER, 'Eli', 'Sirio', 'H',
    '2024-02-01', 0.09, 'Marrón', 0,
    NULL, 'https://em-content.zobj.net/source/microsoft/310/hamster_1f439.png',
    'Control de alimentación cada tres meses.'
),
(
    @ID_USUARIO_MARIA, @ID_ESPECIE_GATO, 'Luna', 'Siamés', 'H',
    '2023-04-12', 4.20, 'Crema', 1,
    NULL, 'https://em-content.zobj.net/source/microsoft/378/cat-face_1f431.png', NULL
);
GO

/*==============================================================
  4. VETERINARIOS Y SERVICIOS
==============================================================*/
INSERT INTO dbo.TM_VETERINARIO
(
    NOMBRES, APELLIDOS, CMPV, ESPECIALIDAD, TELEFONO, CORREO
)
VALUES
('Carla', 'Rojas Pérez', 'CMPV-10234', 'Medicina general', '944111222', 'carla.rojas@maskoteka.pe'),
('Diego', 'Mendoza Salas', 'CMPV-11789', 'Dermatología veterinaria', '944333444', 'diego.mendoza@maskoteka.pe'),
('Lucía', 'Vega Chávez', 'CMPV-12655', 'Nutrición veterinaria', '944555666', 'lucia.vega@maskoteka.pe');
GO

INSERT INTO dbo.TM_SERVICIO
(
    NOMBRE, DESCRIPCION, DURACION_MINUTOS, PRECIO
)
VALUES
('Consulta general', 'Evaluación clínica general de la mascota.', 30, 60.00),
('Consulta especializada', 'Atención por un médico veterinario especialista.', 45, 80.00),
('Vacunación', 'Aplicación de vacuna según edad y calendario.', 30, 55.00),
('Desparasitación', 'Evaluación y administración de antiparasitario.', 30, 45.00),
('Plan de nutrición', 'Evaluación nutricional y plan alimenticio.', 45, 70.00),
('Odontología veterinaria', 'Evaluación de salud oral.', 60, 120.00);
GO

/*==============================================================
  5. DISPONIBILIDAD
==============================================================*/
DECLARE @ID_VET_CARLA INT =
(
    SELECT ID_VETERINARIO
    FROM dbo.TM_VETERINARIO
    WHERE CMPV = 'CMPV-10234'
);

DECLARE @ID_VET_DIEGO INT =
(
    SELECT ID_VETERINARIO
    FROM dbo.TM_VETERINARIO
    WHERE CMPV = 'CMPV-11789'
);

DECLARE @ID_VET_LUCIA INT =
(
    SELECT ID_VETERINARIO
    FROM dbo.TM_VETERINARIO
    WHERE CMPV = 'CMPV-12655'
);

DECLARE @FECHA_BASE DATE = DATEADD(DAY, 1, CAST(GETDATE() AS DATE));
DECLARE @DIA INT = 0;

WHILE @DIA < 5
BEGIN
    INSERT INTO dbo.TB_DISPONIBILIDAD
    (
        ID_VETERINARIO, FECHA_ATENCION, HORA_INICIO, HORA_FIN
    )
    VALUES
    (@ID_VET_CARLA, DATEADD(DAY, @DIA, @FECHA_BASE), '09:00', '09:30'),
    (@ID_VET_CARLA, DATEADD(DAY, @DIA, @FECHA_BASE), '10:00', '10:30'),
    (@ID_VET_DIEGO, DATEADD(DAY, @DIA, @FECHA_BASE), '11:00', '11:45'),
    (@ID_VET_DIEGO, DATEADD(DAY, @DIA, @FECHA_BASE), '14:00', '14:45'),
    (@ID_VET_LUCIA, DATEADD(DAY, @DIA, @FECHA_BASE), '15:00', '15:45');

    SET @DIA += 1;
END;
GO

/*==============================================================
  6. CITA Y PAGO DE ALICE
==============================================================*/
DECLARE @ID_USUARIO_VICTOR INT =
(
    SELECT ID_USUARIO
    FROM dbo.TM_USUARIO
    WHERE CORREO = 'victor.saravia@gmail.com'
);

DECLARE @ID_MASCOTA_ALICE INT =
(
    SELECT ID_MASCOTA
    FROM dbo.TM_MASCOTA
    WHERE ID_USUARIO = @ID_USUARIO_VICTOR
      AND NOMBRE = 'Alice'
      AND ACTIVO = 1
);

DECLARE @ID_SERVICIO_ESPECIALIZADA INT =
(
    SELECT ID_SERVICIO
    FROM dbo.TM_SERVICIO
    WHERE NOMBRE = 'Consulta especializada'
      AND ACTIVO = 1
);

DECLARE @ID_DISPONIBILIDAD_1 INT =
(
    SELECT TOP (1) ID_DISPONIBILIDAD
    FROM dbo.TB_DISPONIBILIDAD
    WHERE ESTADO = 'DISPONIBLE'
    ORDER BY FECHA_ATENCION, HORA_INICIO
);

IF @ID_USUARIO_VICTOR IS NULL
    THROW 51011, 'No se encontró al usuario Victor.', 1;

IF @ID_MASCOTA_ALICE IS NULL
    THROW 51012, 'No se encontró a Alice asociada al usuario Victor.', 1;

DECLARE @ID_CITA_1 INT;
DECLARE @ID_PAGO_1 INT;

EXEC dbo.usp_Cita_Registrar
    @ID_USUARIO = @ID_USUARIO_VICTOR,
    @ID_MASCOTA = @ID_MASCOTA_ALICE,
    @ID_SERVICIO = @ID_SERVICIO_ESPECIALIZADA,
    @ID_DISPONIBILIDAD = @ID_DISPONIBILIDAD_1,
    @MOTIVO_CONSULTA = 'Revisión de alergia cutánea.',
    @ID_CITA = @ID_CITA_1 OUTPUT;

EXEC dbo.usp_Pago_Registrar
    @ID_CITA = @ID_CITA_1,
    @METODO = 'TARJETA',
    @ESTADO = 'APROBADO',
    @CODIGO_TRANSACCION = 'TXN-MASK-000001',
    @ULTIMOS_4 = '4242',
    @ID_PAGO = @ID_PAGO_1 OUTPUT;
GO

/*==============================================================
  7. CITA DE MILO
==============================================================*/
DECLARE @ID_USUARIO_VICTOR INT =
(
    SELECT ID_USUARIO
    FROM dbo.TM_USUARIO
    WHERE CORREO = 'victor.saravia@gmail.com'
);

DECLARE @ID_MASCOTA_MILO INT =
(
    SELECT ID_MASCOTA
    FROM dbo.TM_MASCOTA
    WHERE ID_USUARIO = @ID_USUARIO_VICTOR
      AND NOMBRE = 'Milo'
      AND ACTIVO = 1
);

DECLARE @ID_SERVICIO_VACUNACION INT =
(
    SELECT ID_SERVICIO
    FROM dbo.TM_SERVICIO
    WHERE NOMBRE = 'Vacunación'
      AND ACTIVO = 1
);

DECLARE @ID_DISPONIBILIDAD_2 INT =
(
    SELECT TOP (1) ID_DISPONIBILIDAD
    FROM dbo.TB_DISPONIBILIDAD
    WHERE ESTADO = 'DISPONIBLE'
    ORDER BY FECHA_ATENCION, HORA_INICIO
);

IF @ID_MASCOTA_MILO IS NULL
    THROW 51013, 'No se encontró a Milo asociado al usuario Victor.', 1;

DECLARE @ID_CITA_2 INT;

EXEC dbo.usp_Cita_Registrar
    @ID_USUARIO = @ID_USUARIO_VICTOR,
    @ID_MASCOTA = @ID_MASCOTA_MILO,
    @ID_SERVICIO = @ID_SERVICIO_VACUNACION,
    @ID_DISPONIBILIDAD = @ID_DISPONIBILIDAD_2,
    @MOTIVO_CONSULTA = 'Aplicación de vacuna anual.',
    @ID_CITA = @ID_CITA_2 OUTPUT;
GO

/*==============================================================
  8. CONSULTAS DE VALIDACIÓN
==============================================================*/
SELECT
    U.ID_USUARIO,
    U.CORREO,
    M.ID_MASCOTA,
    M.NOMBRE AS MASCOTA,
    M.ACTIVO
FROM dbo.TM_USUARIO U
INNER JOIN dbo.TM_MASCOTA M
    ON M.ID_USUARIO = U.ID_USUARIO
ORDER BY U.ID_USUARIO, M.ID_MASCOTA;
GO

EXEC dbo.usp_Servicio_Listar;
GO

DECLARE @ID_USUARIO_PRUEBA INT =
(
    SELECT ID_USUARIO
    FROM dbo.TM_USUARIO
    WHERE CORREO = 'victor.saravia@gmail.com'
);

EXEC dbo.usp_Mascota_ListarPorUsuario
    @ID_USUARIO = @ID_USUARIO_PRUEBA;

EXEC dbo.usp_Cita_ListarPorUsuario
    @ID_USUARIO = @ID_USUARIO_PRUEBA;

DECLARE @FECHA_DESDE_PRUEBA DATE = CAST(GETDATE() AS DATE);
DECLARE @FECHA_HASTA_PRUEBA DATE = DATEADD(DAY, 10, @FECHA_DESDE_PRUEBA);

EXEC dbo.usp_Disponibilidad_Listar
    @FECHA_DESDE = @FECHA_DESDE_PRUEBA,
    @FECHA_HASTA = @FECHA_HASTA_PRUEBA;
GO