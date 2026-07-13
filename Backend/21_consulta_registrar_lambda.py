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
        DECLARE @ID_CONSULTA INT;
        EXEC dbo.usp_Consulta_Registrar
            @ID_MASCOTA=?,
            @ID_VETERINARIO=?,
            @FECHA_CONSULTA=?,
            @DIAGNOSTICO=?,
            @TRATAMIENTO=?,
            @PESO_KG=?,
            @ID_CONSULTA=@ID_CONSULTA OUTPUT;
        SELECT @ID_CONSULTA;
        """

        params = (
            event.get('idMascota'),
            event.get('idVeterinario'),
            event.get('fechaConsulta'),
            event.get('diagnostico'),
            event.get('tratamiento'),
            event.get('pesoKg')
        )

        cursor.execute(sql, params)
        idConsulta = cursor.fetchone()[0]
        conn.commit()

        return {
            'msg': 'Consulta registrada correctamente',
            'idConsulta': idConsulta
        }
    except Exception as e:
        conn.rollback()
        return {'error': str(e)}
    finally:
        cursor.close()
        conn.close()
