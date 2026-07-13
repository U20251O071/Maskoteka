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
        DECLARE @ID_DOCUMENTO INT;
        EXEC dbo.usp_Documento_Registrar
            @ID_MASCOTA=?,
            @NOMBRE=?,
            @TIPO=?,
            @URL=?,
            @DESCRIPCION=?,
            @ID_DOCUMENTO=@ID_DOCUMENTO OUTPUT;
        SELECT @ID_DOCUMENTO;
        """

        params = (
            event.get('idMascota'),
            event.get('nombre'),
            event.get('tipo'),
            event.get('url'),
            event.get('descripcion')
        )

        cursor.execute(sql, params)
        idDocumento = cursor.fetchone()[0]
        conn.commit()

        return {
            'msg': 'Documento registrado correctamente',
            'idDocumento': idDocumento
        }
    except Exception as e:
        conn.rollback()
        return {'error': str(e)}
    finally:
        cursor.close()
        conn.close()
