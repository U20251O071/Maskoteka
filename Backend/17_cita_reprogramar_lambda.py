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
        params = (
            event.get('idCita'),
            event.get('idUsuario'),
            event.get('idNuevaDisponibilidad')
        )

        cursor.execute("""
            EXEC dbo.usp_Cita_Reprogramar
                @ID_CITA=?,
                @ID_USUARIO=?,
                @ID_NUEVA_DISPONIBILIDAD=?
        """, params)

        conn.commit()

        return {'msg': 'Cita reprogramada correctamente'}
    except Exception as e:
        conn.rollback()
        return {'error': str(e)}
    finally:
        cursor.close()
        conn.close()
