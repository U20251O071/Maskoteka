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
            event.get('idCita'),
            event.get('idUsuario')
        )

        cursor.execute("""
            EXEC dbo.usp_Cita_Obtener
                @ID_CITA=?,
                @ID_USUARIO=?
        """, params)

        cita = None
        row = cursor.fetchone()

        if row is not None:
            cita = {
                'idCita': row[0],
                'idMascota': row[1],
                'mascota': row[2],
                'especie': row[3],
                'raza': row[4],
                'idServicio': row[5],
                'servicio': row[6],
                'precio': float(row[7]),
                'idDisponibilidad': row[8],
                'fecha': str(row[9]),
                'horaInicio': str(row[10]),
                'horaFin': str(row[11]),
                'idVeterinario': row[12],
                'veterinario': row[13],
                'especialidad': row[14],
                'estado': row[15],
                'motivoConsulta': row[16],
                'observaciones': row[17]
            }

        cursor.nextset()

        pagos = []
        for row in cursor:
            pagos.append({
                'idPago': row[0],
                'monto': float(row[1]),
                'metodo': row[2],
                'estado': row[3],
                'codigoTransaccion': row[4],
                'ultimos4': row[5],
                'fechaPago': str(row[6])
            })

        if cita is not None:
            cita['pagos'] = pagos

        return {'data': cita}
    except Exception as e:
        return {'error': str(e), 'data': None}
    finally:
        cursor.close()
        conn.close()
