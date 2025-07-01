#!/bin/bash

# This script waits for SQL Server to be ready and then restores the databases.

# Function to check if SQL Server is ready
function wait_for_sql_server() {
  echo "Waiting for SQL Server to be ready..."
  # Loop until SQL Server is listening on port 1433
  /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -Q "SELECT 1" &> /dev/null
  while [ $? -ne 0 ]
  do
    echo "SQL Server is not ready yet. Retrying in 5 seconds..."
    sleep 5
    /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -Q "SELECT 1" &> /dev/null
  done
  echo "SQL Server is ready!"
}

# Run the wait function
wait_for_sql_server

echo "Restoring Northwind database..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -Q "RESTORE DATABASE Northwind FROM DISK = '/var/opt/mssql/backup/Northwind.bak' WITH MOVE 'Northwind' TO '/var/opt/mssql/data/Northwind.mdf', MOVE 'Northwind_log' TO '/var/opt/mssql/data/Northwind_log.ldf', REPLACE;"

if [ $? -eq 0 ]; then
  echo "Northwind database restored successfully."
else
  echo "Error restoring Northwind database."
  exit 1
fi

echo "Restoring LogDb database..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -Q "RESTORE DATABASE LogDb FROM DISK = '/var/opt/mssql/backup/LogDb.bak' WITH MOVE 'LogDb' TO '/var/opt/mssql/data/LogDb.mdf', MOVE 'LogDb_log' TO '/var/opt/mssql/data/LogDb_log.ldf', REPLACE;"

if [ $? -eq 0 ]; then
  echo "LogDb database restored successfully."
else
  echo "Error restoring LogDb database."
  exit 1
fi

echo "Database restoration complete."

# Important: Do NOT exit this script if you want SQL Server to continue running.
# The CMD in Dockerfile takes care of keeping sqlservr process alive.
# This script finishes, and then the main SQL Server process (sqlservr) takes over.