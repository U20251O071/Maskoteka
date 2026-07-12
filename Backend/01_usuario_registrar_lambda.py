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
        nombres = event.get('nombres')
        apellidos = event.get('apellidos')
        correo = event.get('correo')
        clave = event.get('clave')
        telefono = event.get('telefono')
        tipoDocumento = event.get('tipoDocumento')
        numeroDocumento = event.get('numeroDocumento')
        direccion = event.get('direccion')

        claveHash = hashlib.sha256(clave.encode('utf-8')).hexdigest()

        sql = """
        DECLARE @ID_USUARIO INT;
        EXEC dbo.usp_Usuario_Registrar
            @NOMBRES=?,
            @APELLIDOS=?,
            @CORREO=?,
            @CLAVE=?,
            @TELEFONO=?,
            @TIPO_DOCUMENTO=?,
            @NUMERO_DOCUMENTO=?,
            @DIRECCION=?,
            @ID_USUARIO=@ID_USUARIO OUTPUT;
        SELECT @ID_USUARIO;
        """

        params = (
            nombres, apellidos, correo, claveHash, telefono,
            tipoDocumento, numeroDocumento, direccion
        )

        cursor.execute(sql, params)
        idUsuario = cursor.fetchone()[0]
        conn.commit()

        return {
            'isSuccess': True,
            'errorCode': '200',
            'errorMessage': 'OK',
            'data': {
                'idUsuario': idUsuario,
                'correo': correo
            }
        }
    except Exception as e:
        conn.rollback()
        return {
            'isSuccess': False,
            'errorCode': '400',
            'errorMessage': str(e),
            'data': None
        }
    finally:
        cursor.close()
        conn.close()
