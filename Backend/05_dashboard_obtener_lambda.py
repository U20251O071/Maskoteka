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
            'EXEC dbo.usp_Dashboard_Obtener @ID_USUARIO=?',
            (idUsuario,)
        )

        resumen = {}
        row = cursor.fetchone()

        if row is not None:
            resumen = {
                'totalMascotas': row[0],
                'citasProximas': row[1],
                'citasCompletadas': row[2]
            }

        cursor.nextset()

        proximasCitas = []

        for row in cursor:
            proximasCitas.append({
                'idCita': row[0],
                'mascota': row[1],
                'servicio': row[2],
                'fecha': str(row[3]),
                'hora': str(row[4]),
                'estado': row[5]
            })

        return {
            'data': {
                'resumen': resumen,
                'proximasCitas': proximasCitas
            }
        }
    except Exception as e:
        return {'error': str(e), 'data': None}
    finally:
        cursor.close()
        conn.close()
