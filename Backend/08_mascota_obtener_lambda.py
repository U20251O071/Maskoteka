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
        idMascota = event.get('idMascota')
        idUsuario = event.get('idUsuario')

        cursor.execute(
            'EXEC dbo.usp_Mascota_Obtener @ID_MASCOTA=?, @ID_USUARIO=?',
            (idMascota, idUsuario)
        )

        mascota = None
        row = cursor.fetchone()

        if row is not None:
            mascota = {
                'idMascota': row[0],
                'idUsuario': row[1],
                'idEspecie': row[2],
                'nombre': row[3],
                'especie': row[4],
                'raza': row[5],
                'sexo': row[6],
                'fechaNacimiento': str(row[7]) if row[7] else None,
                'pesoKg': float(row[8]) if row[8] is not None else None,
                'color': row[9],
                'esterilizado': bool(row[10]),
                'microchip': row[11],
                'fotoUrl': row[12],
                'observaciones': row[13]
            }

        cursor.nextset()

        vacunas = []
        for row in cursor:
            vacunas.append({
                'idVacuna': row[0],
                'nombreVacuna': row[1],
                'fechaAplicacion': str(row[2]),
                'fechaProxima': str(row[3]) if row[3] else None,
                'veterinario': row[4],
                'observaciones': row[5]
            })

        cursor.nextset()

        consultas = []
        for row in cursor:
            consultas.append({
                'idConsulta': row[0],
                'fechaConsulta': str(row[1]),
                'diagnostico': row[2],
                'tratamiento': row[3],
                'pesoKg': float(row[4]) if row[4] is not None else None,
                'veterinario': row[5]
            })

        cursor.nextset()

        documentos = []
        for row in cursor:
            documentos.append({
                'idDocumento': row[0],
                'nombre': row[1],
                'tipo': row[2],
                'url': row[3],
                'fechaCreacion': str(row[4])
            })

        if mascota is not None:
            mascota['vacunas'] = vacunas
            mascota['consultas'] = consultas
            mascota['documentos'] = documentos

        return {'data': mascota}
    except Exception as e:
        return {'error': str(e), 'data': None}
    finally:
        cursor.close()
        conn.close()
