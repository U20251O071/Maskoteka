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
            event.get('fechaDesde'),
            event.get('fechaHasta'),
            event.get('idVeterinario')
        )

        cursor.execute("""
            EXEC dbo.usp_Disponibilidad_Listar
                @FECHA_DESDE=?,
                @FECHA_HASTA=?,
                @ID_VETERINARIO=?
        """, params)

        data = []

        for row in cursor:
            data.append({
                'idDisponibilidad': row[0],
                'fecha': str(row[1]),
                'horaInicio': str(row[2]),
                'horaFin': str(row[3]),
                'idVeterinario': row[4],
                'veterinario': row[5],
                'especialidad': row[6]
            })

        return {'data': data}
    except Exception as e:
        return {'error': str(e), 'data': []}
    finally:
        cursor.close()
        conn.close()
