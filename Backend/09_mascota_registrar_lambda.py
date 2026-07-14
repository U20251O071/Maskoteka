import json
import pyodbc

def get_connection():
    return pyodbc.connect(
        "Driver={ODBC Driver 18 for SQL Server};"
        "Server=dbmaskoteka.cshlj5vyhbj0.us-east-1.rds.amazonaws.com;"
        "Database=BD_MASKOTEKA;"
        "UID=admin;"
        "PWD=26Jo$ue.,-CV1997."
    )


def lambda_handler(event, context):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        sql = """
        DECLARE @ID_MASCOTA INT;
        EXEC dbo.usp_Mascota_Registrar
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
            @OBSERVACIONES=?,
            @ID_MASCOTA=@ID_MASCOTA OUTPUT;
        SELECT @ID_MASCOTA;
        """

        params = (
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

        cursor.execute(sql, params)
        idMascota = cursor.fetchone()[0]
        conn.commit()

        return {
            'msg': 'Mascota registrada correctamente',
            'idMascota': idMascota
        }
    except Exception as e:
        conn.rollback()
        return {'error': str(e)}
    finally:
        cursor.close()
        conn.close()
