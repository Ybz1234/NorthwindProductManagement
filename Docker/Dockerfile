FROM mcr.microsoft.com/mssql/server:2022-latest

ENV ACCEPT_EULA=Y

USER root
RUN apt-get update \
 && apt-get install -y curl apt-transport-https gnupg2 \
 && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
 && curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list \
      > /etc/apt/sources.list.d/mssql-release.list \
 && apt-get update \
 && ACCEPT_EULA=Y apt-get install -y msodbcsql18 mssql-tools unixodbc-dev \
 && ln -sfn /opt/mssql-tools/bin/sqlcmd /usr/bin/sqlcmd

WORKDIR /var/opt/mssql/backup
COPY Northwind.bak .
COPY LogDb.bak .

WORKDIR /usr/src/app
COPY restore-databases.sh .
RUN chmod +x restore-databases.sh \
 && chown -R mssql:mssql /var/opt/mssql

USER mssql

CMD ["/bin/bash", "/usr/src/app/restore-databases.sh"]

EXPOSE 1433