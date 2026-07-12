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
        sql = """
        DECLARE @ID_CITA INT;
        EXEC dbo.usp_Cita_Registrar
            @ID_USUARIO=?,
            @ID_MASCOTA=?,
            @ID_SERVICIO=?,
            @ID_DISPONIBILIDAD=?,
            @MOTIVO_CONSULTA=?,
            @ID_CITA=@ID_CITA OUTPUT;
        SELECT @ID_CITA;
        """

        params = (
            event.get('idUsuario'),
            event.get('idMascota'),
            event.get('idServicio'),
            event.get('idDisponibilidad'),
            event.get('motivoConsulta')
        )

        cursor.execute(sql, params)
        idCita = cursor.fetchone()[0]
        conn.commit()

        return {
            'msg': 'Cita registrada correctamente',
            'idCita': idCita
        }
    except Exception as e:
        conn.rollback()
        return {'error': str(e)}
    finally:
        cursor.close()
        conn.close()
