FROM mcr.microsoft.com/mssql/server:2022-latest

USER root

ENV ACCEPT_EULA=Y
WORKDIR /var/opt/mssql/backup
COPY Northwind.bak .
COPY LogDb.bak .

WORKDIR /usr/src/app
COPY restore-databases.sh .
RUN chmod +x restore-databases.sh

USER mssql

CMD ["/bin/bash", "/usr/src/app/restore-databases.sh"]
EXPOSE 1433