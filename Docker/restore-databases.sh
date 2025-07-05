#!/usr/bin/env bash
set -e

/opt/mssql/bin/sqlservr &

echo "Waiting for SQL Server to accept connections ..."
until /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -Q "SELECT 1" &>/dev/null
do
  sleep 2
done
echo "SQL Server is up – restoring databases."

/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -Q "
RESTORE DATABASE [Northwind]
  FROM DISK = '/var/opt/mssql/backup/Northwind.bak'
  WITH MOVE 'Northwind'     TO '/var/opt/mssql/data/Northwind.mdf',
       MOVE 'Northwind_log' TO '/var/opt/mssql/data/Northwind_log.ldf',
       REPLACE;
"

/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -Q "
RESTORE DATABASE [LogDb]
  FROM DISK = '/var/opt/mssql/backup/LogDb.bak'
  WITH MOVE 'LogDb'     TO '/var/opt/mssql/data/LogDb.mdf',
       MOVE 'LogDb_log' TO '/var/opt/mssql/data/LogDb_log.ldf',
       REPLACE;
"

echo "Restores complete – handing control back to sqlservr."
wait -n