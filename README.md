# NorthwindProductManagement
A full stack web application for AllJobs

# sqlserver-northwind

This repository contains a Docker setup to run SQL Server 2022 with the **Northwind** and **LogDb** databases preloaded.

---

## What’s inside

- SQL Server 2022 container (`mcr.microsoft.com/mssql/server:2022-latest`)  
- Two backup files: `Northwind.bak` and `LogDb.bak`  
- Initialization script to restore the databases on container start  

---

## Prerequisites

- Docker installed and running  
- At least 4GB RAM available for the container (recommended)  
- Port 1433 free on your machine (or change mapping if needed)  

---

## How to run

### 1. Clone this repo and navigate to it

```bash
git clone https://github.com/Ybz1234/NorthwindProductManagement.git
cd NorthwindProductManagement

Server: dotnet run
Client: npm run dev

docker build -t sqlserver-northwind .

docker run -d \
  -e "ACCEPT_EULA=Y" \
  -e "SA_PASSWORD=UltraStrongP@ssw0rd123!" \
  -p 1433:1433 \
  --name sqlserver-northwind \
  sqlserver-northwind

Container ID: b7ead7330bd4d14cbb21361000a69ac22c74f8722b55250348de6ee2d7b28f59

