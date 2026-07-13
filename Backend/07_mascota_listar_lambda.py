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
            'EXEC dbo.usp_Mascota_ListarPorUsuario @ID_USUARIO=?',
            (idUsuario,)
        )

        data = []

        for row in cursor:
            data.append({
                'idMascota': row[0],
                'nombre': row[1],
                'especie': row[2],
                'raza': row[3],
                'sexo': row[4],
                'fechaNacimiento': str(row[5]) if row[5] else None,
                'pesoKg': float(row[6]) if row[6] is not None else None,
                'color': row[7],
                'esterilizado': bool(row[8]),
                'microchip': row[9],
                'fotoUrl': row[10],
                'observaciones': row[11]
            })

        return {'data': data}
    except Exception as e:
        return {'error': str(e), 'data': []}
    finally:
        cursor.close()
        conn.close()
