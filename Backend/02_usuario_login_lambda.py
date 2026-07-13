import json
import pyodbc
import hashlib

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
        correo = event.get('correo')
        clave = event.get('clave')

        cursor.execute(
            'EXEC dbo.usp_Usuario_Login @CORREO=?',
            (correo,)
        )

        row = cursor.fetchone()

        if row is None or row[4] != clave:
            return {
                'isSuccess': False,
                'errorCode': '401',
                'errorMessage': 'Correo o contraseña incorrectos',
                'data': None
            }

        return {
            'isSuccess': True,
            'errorCode': '200',
            'errorMessage': 'OK',
            'data': {
                'idUsuario': row[0],
                'nombres': row[1],
                'apellidos': row[2],
                'correo': row[3],
                'rol': row[5]
            }
        }
    except Exception as e:
        return {
            'isSuccess': False,
            'errorCode': '400',
            'errorMessage': str(e),
            'data': None
        }
    finally:
        cursor.close()
        conn.close()
