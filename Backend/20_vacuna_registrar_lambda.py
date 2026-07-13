import json
import pyodbc

def get_connection():
    return pyodbc.connect(
        "Driver={ODBC Driver 18 for SQL Server};"
        "Server=dbmaskoteka.cshlj5vyhbj0.us-east-1.rds.amazonaws.com;"
        "Database=BD_MASKOTEKA;"
        "UID=admin;"
        "PWD=password"
    )


def lambda_handler(event, context):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        sql = """
        DECLARE @ID_VACUNA INT;
        EXEC dbo.usp_Vacuna_Registrar
            @ID_MASCOTA=?,
            @NOMBRE_VACUNA=?,
            @FECHA_APLICACION=?,
            @FECHA_PROXIMA=?,
            @ID_VETERINARIO=?,
            @OBSERVACIONES=?,
            @ID_VACUNA=@ID_VACUNA OUTPUT;
        SELECT @ID_VACUNA;
        """

        params = (
            event.get('idMascota'),
            event.get('nombreVacuna'),
            event.get('fechaAplicacion'),
            event.get('fechaProxima'),
            event.get('idVeterinario'),
            event.get('observaciones')
        )

        cursor.execute(sql, params)
        idVacuna = cursor.fetchone()[0]
        conn.commit()

        return {
            'msg': 'Vacuna registrada correctamente',
            'idVacuna': idVacuna
        }
    except Exception as e:
        conn.rollback()
        return {'error': str(e)}
    finally:
        cursor.close()
        conn.close()
