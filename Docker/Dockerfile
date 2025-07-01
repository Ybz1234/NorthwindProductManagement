# Use the official Microsoft SQL Server 2022 image
FROM mcr.microsoft.com/mssql/server:2022-latest

# Set environment variables for the SQL Server instance
# These are required by the base image
ENV ACCEPT_EULA=Y
# REMOVED: ENV SA_PASSWORD="UltraStrongP@ssw0rd123!"

# Create a directory inside the container for backup files
WORKDIR /var/opt/mssql/backup

# Copy your backup files into the container
COPY Northwind.bak .
COPY LogDb.bak .

# Copy the database restoration script into the container
# Ensure this script is executable
COPY restore-databases.sh /usr/src/app/restore-databases.sh
RUN chmod +x /usr/src/app/restore-databases.sh

# Use the custom entrypoint script.
# The base SQL Server image has its own entrypoint, but we'll prepend ours
# to ensure our script runs before SQL Server fully starts and is ready for connections.
# This approach uses an array for CMD to run multiple commands, ensuring our script runs first.
CMD ["/bin/bash", "-c", "/usr/src/app/restore-databases.sh & /opt/mssql/bin/sqlservr"]

# Expose the default SQL Server port
EXPOSE 1433