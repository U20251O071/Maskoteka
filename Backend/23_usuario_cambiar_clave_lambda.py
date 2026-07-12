import json
import pyodbc
import hashlib

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
        idUsuario = event.get('idUsuario')
        claveNueva = event.get('claveNueva')
        claveHash = hashlib.sha256(claveNueva.encode('utf-8')).hexdigest()

        cursor.execute("""
            EXEC dbo.usp_Usuario_CambiarClave
                @ID_USUARIO=?,
                @CLAVE_NUEVA=?
        """, (idUsuario, claveHash))

        conn.commit()

        return {'msg': 'Contraseña actualizada correctamente'}
    except Exception as e:
        conn.rollback()
        return {'error': str(e)}
    finally:
        cursor.close()
        conn.close()
