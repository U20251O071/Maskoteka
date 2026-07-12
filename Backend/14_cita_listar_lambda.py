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
            event.get('estado')
        )

        cursor.execute("""
            EXEC dbo.usp_Cita_ListarPorUsuario
                @ID_USUARIO=?,
                @ESTADO=?
        """, params)

        data = []

        for row in cursor:
            data.append({
                'idCita': row[0],
                'idMascota': row[1],
                'mascota': row[2],
                'servicio': row[3],
                'precio': float(row[4]),
                'fecha': str(row[5]),
                'horaInicio': str(row[6]),
                'horaFin': str(row[7]),
                'veterinario': row[8],
                'estado': row[9],
                'motivoConsulta': row[10],
                'fechaCreacion': str(row[11])
            })

        return {'data': data}
    except Exception as e:
        return {'error': str(e), 'data': []}
    finally:
        cursor.close()
        conn.close()
