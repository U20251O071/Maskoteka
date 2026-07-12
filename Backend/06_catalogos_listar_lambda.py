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
        cursor.execute('EXEC dbo.usp_Catalogos_Listar')

        especies = []
        for row in cursor:
            especies.append({
                'idEspecie': row[0],
                'nombre': row[1]
            })

        cursor.nextset()

        servicios = []
        for row in cursor:
            servicios.append({
                'idServicio': row[0],
                'nombre': row[1],
                'descripcion': row[2],
                'duracionMinutos': row[3],
                'precio': float(row[4])
            })

        cursor.nextset()

        veterinarios = []
        for row in cursor:
            veterinarios.append({
                'idVeterinario': row[0],
                'nombre': row[1],
                'especialidad': row[2]
            })

        return {
            'data': {
                'especies': especies,
                'servicios': servicios,
                'veterinarios': veterinarios
            }
        }
    except Exception as e:
        return {'error': str(e), 'data': None}
    finally:
        cursor.close()
        conn.close()
