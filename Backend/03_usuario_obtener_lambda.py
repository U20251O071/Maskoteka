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
        idUsuario = event.get('idUsuario')

        cursor.execute(
            'EXEC dbo.usp_Usuario_ObtenerPerfil @ID_USUARIO=?',
            (idUsuario,)
        )

        data = []

        for row in cursor:
            data.append({
                'idUsuario': row[0],
                'nombres': row[1],
                'apellidos': row[2],
                'tipoDocumento': row[3],
                'numeroDocumento': row[4],
                'telefono': row[5],
                'correo': row[6],
                'direccion': row[7],
                'rol': row[8],
                'fechaCreacion': str(row[9])
            })

        return {'data': data}
    except Exception as e:
        return {'error': str(e), 'data': []}
    finally:
        cursor.close()
        conn.close()
