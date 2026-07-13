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
        cursor.execute('EXEC dbo.usp_Servicio_Listar')

        data = []

        for row in cursor:
            data.append({
                'idServicio': row[0],
                'nombre': row[1],
                'descripcion': row[2],
                'duracionMinutos': row[3],
                'precio': float(row[4])
            })

        return {'data': data}
    except Exception as e:
        return {'error': str(e), 'data': []}
    finally:
        cursor.close()
        conn.close()
