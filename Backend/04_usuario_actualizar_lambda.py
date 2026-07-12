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
            event.get('idUsuario'),
            event.get('nombres'),
            event.get('apellidos'),
            event.get('correo'),
            event.get('telefono'),
            event.get('tipoDocumento'),
            event.get('numeroDocumento'),
            event.get('direccion')
        )

        cursor.execute("""
            EXEC dbo.usp_Usuario_Actualizar
                @ID_USUARIO=?,
                @NOMBRES=?,
                @APELLIDOS=?,
                @CORREO=?,
                @TELEFONO=?,
                @TIPO_DOCUMENTO=?,
                @NUMERO_DOCUMENTO=?,
                @DIRECCION=?
        """, params)

        conn.commit()

        return {'msg': 'Usuario actualizado correctamente'}
    except Exception as e:
        conn.rollback()
        return {'error': str(e)}
    finally:
        cursor.close()
        conn.close()
