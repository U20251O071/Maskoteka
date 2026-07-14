import json
import pyodbc

def get_connection():
    return pyodbc.connect(
        "Driver={ODBC Driver 18 for SQL Server};"
        "Server=dbmaskoteka.cshlj5vyhbj0.us-east-1.rds.amazonaws.com;"
        "Database=BD_MASKOTEKA;"
        "UID=admin;"
        "PWD=26Jo$ue.,-CV1997."
    )


def lambda_handler(event, context):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('EXEC dbo.usp_Especie_Listar')

        data = []

        for row in cursor:
            data.append({
                'idEspecie': row[0],
                'nombre': row[1],
                'estado': row[2]
            })

        return {'data': data}
    except Exception as e:
        return {'error': str(e), 'data': []}
    finally:
        cursor.close()
        conn.close()
