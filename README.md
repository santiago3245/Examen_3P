# Sistema de Gestión de Siniestros

Sistema distribuido de gestión de siniestros desarrollado con arquitectura de microservicios, utilizando Spring Boot para el backend, React para el frontend, y desplegable con Docker Compose y Kubernetes.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Arquitectura](#arquitectura)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Despliegue](#despliegue)
- [API Endpoints](#api-endpoints)
- [Contribuir](#contribuir)

## 📖 Descripción

Este sistema permite gestionar:
- **Pólizas**: Gestión de pólizas de seguros (Auto, Hogar, Vida, Salud)
- **Proveedores**: Registro de proveedores de servicios (Talleres, Clínicas, Grúas)
- **Siniestros**: Gestión de casos de siniestros vinculados a pólizas y proveedores

## 🏗️ Arquitectura

```
┌─────────────┐
│   Frontend  │ (React + Nginx)
│  Port 3000  │
└──────┬──────┘
       │
       ├──────────────┬──────────────┬──────────────┐
       │              │              │              │
┌──────▼──────┐ ┌────▼─────┐ ┌──────▼──────┐      │
│   Póliza    │ │ Proveedor│ │  Siniestro  │      │
│  Service    │ │  Service │ │   Service   │      │
│  Port 8081  │ │ Port 8082│ │  Port 8083  │      │
└──────┬──────┘ └────┬─────┘ └──────┬──────┘      │
       │             │               │              │
┌──────▼──────┐ ┌────▼─────┐ ┌──────▼──────┐      │
│MySQL Póliza │ │MySQL Prov│ │  PostgreSQL │      │
│  Port 3306  │ │ Port 3307│ │  Port 5432  │      │
└─────────────┘ └──────────┘ └─────────────┘      │
```

### Microservicios

#### 1. Servicio de Pólizas
- **Puerto**: 8081
- **Base de Datos**: MySQL
- **Funcionalidad**: CRUD de pólizas de seguros

#### 2. Servicio de Proveedores
- **Puerto**: 8082
- **Base de Datos**: MySQL
- **Funcionalidad**: CRUD de proveedores de servicios

#### 3. Servicio de Siniestros
- **Puerto**: 8083
- **Base de Datos**: PostgreSQL
- **Funcionalidad**: CRUD de siniestros con relaciones a pólizas y proveedores

#### 4. Frontend
- **Puerto**: 3000 (development) / 80 (production)
- **Tecnología**: React con Nginx como reverse proxy

## 🛠️ Tecnologías

### Backend
- Java 17
- Spring Boot 3.5.10
- Spring Data JPA
- Hibernate
- Lombok
- Maven

### Frontend
- React 18
- React Router DOM 6.20.0
- Axios 1.6.2
- CSS3

### Bases de Datos
- MySQL 8.0 (Pólizas y Proveedores)
- PostgreSQL 15 (Siniestros)

### DevOps
- Docker & Docker Compose
- Kubernetes
- Nginx

## 📦 Requisitos Previos

- **Docker Desktop** 4.0+ con Kubernetes habilitado
- **Java** 17+
- **Node.js** 18+
- **Maven** 3.8+
- **Git**

Opcional:
- **kubectl** (para despliegue en Kubernetes)
- Cuenta en **Docker Hub** (para subir imágenes)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/santiagoarroyo/siniestros.git
cd siniestros
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones.

### 3. Instalar dependencias

#### Backend (cada microservicio)
```bash
# Póliza
cd Póliza/Póliza
mvn clean install
cd ../..

# Proveedor
cd Proveedor/Proveedor
mvn clean install
cd ../..

# Siniestro
cd Siniestro
mvn clean install
cd ..
```

#### Frontend
```bash
cd frontend
npm install
cd ..
```

## 🚢 Despliegue

### Opción 1: Docker Compose (Recomendado para desarrollo)

```bash
# Levantar todos los servicios
docker compose up -d

# Ver logs
docker compose logs -f

# Ver estado
docker compose ps

# Detener servicios
docker compose down
```

Acceder a:
- **Frontend**: http://localhost:3000
- **API Pólizas**: http://localhost:8081/api/polizas
- **API Proveedores**: http://localhost:8082/api/proveedores
- **API Siniestros**: http://localhost:8083/api/siniestros

### Opción 2: Kubernetes

Ver [KUBERNETES-DEPLOYMENT.md](KUBERNETES-DEPLOYMENT.md) para instrucciones detalladas.

#### Pasos rápidos:

```bash
# 1. Construir y subir imágenes a Docker Hub
./push-images.bat  # Windows
# o
./push-images.sh   # Linux/Mac

# 2. Desplegar en Kubernetes
cd k8s
./deploy.bat       # Windows
# o
./deploy.sh        # Linux/Mac

# 3. Verificar
kubectl get all -n siniestros

# 4. Acceder
# http://localhost:30000
```

## 📡 API Endpoints

### Pólizas (Puerto 8081)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/polizas` | Obtener todas las pólizas |
| GET | `/api/polizas/{id}` | Obtener póliza por ID |
| POST | `/api/polizas` | Crear nueva póliza |
| PUT | `/api/polizas/{id}` | Actualizar póliza |
| DELETE | `/api/polizas/{id}` | Eliminar póliza |

#### Ejemplo de Póliza:
```json
{
  "numeroPoliza": "POL-001",
  "tipo": "AUTO",
  "estado": "ACTIVA"
}
```

Tipos: `AUTO`, `HOGAR`, `VIDA`, `SALUD`  
Estados: `ACTIVA`, `SUSPENDIDA`, `CANCELADA`

### Proveedores (Puerto 8082)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/proveedores` | Obtener todos los proveedores |
| GET | `/api/proveedores/{id}` | Obtener proveedor por ID |
| GET | `/api/proveedores/tipo/{tipo}` | Filtrar por tipo |
| GET | `/api/proveedores/ciudad/{ciudad}` | Filtrar por ciudad |
| POST | `/api/proveedores` | Crear nuevo proveedor |
| PUT | `/api/proveedores/{id}` | Actualizar proveedor |
| DELETE | `/api/proveedores/{id}` | Eliminar proveedor |

#### Ejemplo de Proveedor:
```json
{
  "nombre": "Taller Mecánico Central",
  "tipo": "TALLER",
  "ciudad": "Madrid"
}
```

Tipos: `TALLER`, `CLINICA`, `GRUA`

### Siniestros (Puerto 8083)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/siniestros` | Obtener todos los siniestros |
| GET | `/api/siniestros/{id}` | Obtener siniestro por ID |
| POST | `/api/siniestros` | Crear nuevo siniestro |
| PUT | `/api/siniestros/{id}` | Actualizar siniestro |
| DELETE | `/api/siniestros/{id}` | Eliminar siniestro |

#### Ejemplo de Siniestro:
```json
{
  "numeroCaso": "SIN-2024-001",
  "polizaId": 1,
  "proveedorId": 1,
  "fecha": "2024-01-15",
  "descripcion": "Colisión trasera",
  "montoEstimado": 5000.00,
  "estado": "ABIERTO"
}
```

Estados: `ABIERTO`, `EN_PROCESO`, `CERRADO`

## 🗂️ Estructura del Proyecto

```
siniestros/
├── Póliza/Póliza/          # Microservicio de Pólizas
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
├── Proveedor/Proveedor/    # Microservicio de Proveedores
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
├── Siniestro/              # Microservicio de Siniestros
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
├── frontend/               # Aplicación React
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── k8s/                    # Manifiestos de Kubernetes
│   ├── namespace.yaml
│   ├── mysql-poliza.yaml
│   ├── mysql-proveedor.yaml
│   ├── postgres-siniestro.yaml
│   ├── poliza-deployment.yaml
│   ├── proveedor-deployment.yaml
│   ├── siniestro-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── deploy.sh
│   └── deploy.bat
├── docker-compose.yml      # Orquestación con Docker Compose
├── push-images.bat         # Script para subir imágenes (Windows)
├── push-images.sh          # Script para subir imágenes (Linux/Mac)
├── .gitignore
├── .env.example
├── README.md
└── KUBERNETES-DEPLOYMENT.md
```

## 🧪 Testing

### Backend
```bash
cd Póliza/Póliza
mvn test

cd ../../Proveedor/Proveedor
mvn test

cd ../../Siniestro
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## 🐛 Solución de Problemas

### Docker Compose

**Problema**: Los contenedores no inician
```bash
docker compose down -v
docker compose up -d --build
```

**Problema**: Error de conexión a base de datos
```bash
# Verificar que las bases de datos estén corriendo
docker compose ps
docker compose logs mysql-poliza
docker compose logs postgres-siniestro
```

### Kubernetes

**Problema**: Pods en estado "Pending"
```bash
kubectl describe pod <pod-name> -n siniestros
kubectl get events -n siniestros
```

**Problema**: Error "ImagePullBackOff"
```bash
# Verificar que las imágenes existan en Docker Hub
docker pull santiagoarroyo/poliza:latest
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autores

- Santiago Arroyo - [@santiagoarroyo](https://github.com/santiagoarroyo)

## 📞 Contacto

Para preguntas o sugerencias, por favor abre un issue en GitHub.

---

⭐ Si este proyecto te fue útil, no olvides darle una estrella!
