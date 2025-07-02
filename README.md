# NorthwindProductManagement

A full stack web application for AllJobs.

---

## 🧱 Project Overview

This repository contains:

- A full-stack web app with client and server components
- A SQL Server 2022 database container preloaded with:
  - `Northwind` database
  - `LogDb` database
- A Docker setup that automatically restores these databases on container startup

---

## 🐳 What's in the Docker Setup?

- **Base image**: `mcr.microsoft.com/mssql/server:2022-latest`
- **Database backups**:
  - `Northwind.bak`
  - `LogDb.bak`
- **Init script**:
  - `restore-databases.sh` runs automatically on container start
  - Waits for SQL Server to boot, then restores both DBs using `sqlcmd`

---

## ⚙️ Prerequisites

- Docker installed and running
- At least 4GB RAM available for the container (recommended)
- Port `1433` available (or adjust if needed)

---

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/Ybz1234/NorthwindProductManagement.git
cd NorthwindProductManagement

```
### 2. Start the Database Container

```bash
docker compose up --build -d

```

### 3. Start the Server
```bash
cd NorthwindProductManagement
dotnet run

```

### 4. Start the Client
```bash
cd client
npm install
npm run dev

```