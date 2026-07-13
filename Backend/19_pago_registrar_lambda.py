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
        sql = """
        DECLARE @ID_PAGO INT;
        EXEC dbo.usp_Pago_Registrar
            @ID_CITA=?,
            @METODO=?,
            @ESTADO=?,
            @CODIGO_TRANSACCION=?,
            @ULTIMOS_4=?,
            @ID_PAGO=@ID_PAGO OUTPUT;
        SELECT @ID_PAGO;
        """

        params = (
            event.get('idCita'),
            event.get('metodo'),
            event.get('estado'),
            event.get('codigoTransaccion'),
            event.get('ultimos4')
        )

        cursor.execute(sql, params)
        idPago = cursor.fetchone()[0]
        conn.commit()

        return {
            'msg': 'Pago registrado correctamente',
            'idPago': idPago
        }
    except Exception as e:
        conn.rollback()
        return {'error': str(e)}
    finally:
        cursor.close()
        conn.close()
