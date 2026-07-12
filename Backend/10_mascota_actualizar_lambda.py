import json
import pyodbc

def get_connection():
    return pyodbc.connect(
        "Driver={ODBC Driver 18 for SQL Server};"
        "Server=TU-ENDPOINT-RDS;"
        "Database=BD_MASKOTEKA;"
        "UID=admin;"
        "PWD=TU_CLAVE;"
        "Encrypt=yes;"
        "TrustServerCertificate=yes;"
    )


def lambda_handler(event, context):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        params = (
            event.get('idMascota'),
            event.get('idUsuario'),
            event.get('idEspecie'),
            event.get('nombre'),
            event.get('raza'),
            event.get('sexo'),
            event.get('fechaNacimiento'),
            event.get('pesoKg'),
            event.get('color'),
            event.get('esterilizado'),
            event.get('microchip'),
            event.get('fotoUrl'),
            event.get('observaciones')
        )

        cursor.execute("""
            EXEC dbo.usp_Mascota_Actualizar
                @ID_MASCOTA=?,
                @ID_USUARIO=?,
                @ID_ESPECIE=?,
                @NOMBRE=?,
                @RAZA=?,
                @SEXO=?,
                @FECHA_NACIMIENTO=?,
                @PESO_KG=?,
                @COLOR=?,
                @ESTERILIZADO=?,
                @MICROCHIP=?,
                @FOTO_URL=?,
                @OBSERVACIONES=?
        """, params)

        conn.commit()

        return {'msg': 'Mascota actualizada correctamente'}
    except Exception as e:
        conn.rollback()
        return {'error': str(e)}
    finally:
        cursor.close()
        conn.close()
