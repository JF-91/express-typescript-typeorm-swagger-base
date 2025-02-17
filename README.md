# Express TypeScript API

API RESTful construida con Express, TypeScript y Prisma.

## Estructura del Proyecto

```
src/
├── config/          # Configuraciones de la aplicación
├── modules/         # Módulos de la aplicación
│   ├── block/       # Nuevo módulo de bloques
│   │   ├── controllers/
│   │   ├── dtos/
│   │   ├── interfaces/
│   │   ├── schemas/
│   │   └── services/
│   ├── user/
│   ├── profile/
│   ├── page/
│   ├── post/
│   ├── role/
│   ├── permission/
│   └── shared/
├── routes/
├── services/
└── types/
```

## Características

- 🚀 Express + TypeScript
- 📦 Prisma ORM
- 🔐 JWT Authentication
- 📝 Swagger Documentation
- 🔄 Rate Limiting
- 🛡️ CORS & Helmet Security
- 📊 MySQL Database
- 🐳 Docker Support

## Módulos

### Block Module (Nuevo)
- Gestión de bloques de contenido
- Soporte para imágenes y videos
- Tipos de bloques configurables
- Relaciones con posts

### Post Module
- CRUD de posts
- Categorización
- Relaciones con usuarios y bloques

### User Module
- Autenticación y autorización
- Roles y permisos
- Perfiles de usuario

## Requisitos

- Node.js >= 18
- MySQL >= 8
- Docker (opcional)

## Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Iniciar la base de datos:
```bash
docker-compose up mysql -d
```

5. Ejecutar migraciones:
```bash
npm run prisma:migrate
```

6. Ejecutar seeders:
```bash
# Ejecutar todos los seeders
npm run seed:all

# O ejecutar seeders individualmente
npm run seed:roles-permissions  # Crear roles y permisos básicos
npm run seed:admin             # Crear usuario administrador
npm run seed:blocks            # Crear bloques de ejemplo
```

## Desarrollo

```bash
npm run dev
```

## Docker

Iniciar todo el stack:
```bash
docker-compose up -d
```

## API Documentation

Accede a la documentación Swagger:
```
http://localhost:3000/api-docs
```

## Scripts Disponibles

- `npm run dev`: Desarrollo con hot-reload
- `npm run build`: Compilar TypeScript
- `npm start`: Ejecutar en producción
- `npm test`: Ejecutar tests
- `npm run prisma:migrate`: Ejecutar migraciones
- `npm run prisma:studio`: UI para la base de datos
- `npm run seed:all`: Ejecutar todos los seeders
- `npm run seed:roles-permissions`: Crear roles y permisos
- `npm run seed:admin`: Crear usuario admin
- `npm run seed:blocks`: Crear bloques de ejemplo

## Endpoints Principales

- `GET /api/blocks`: Listar bloques
- `POST /api/blocks`: Crear bloque
- `GET /api/posts`: Listar posts
- `POST /api/users`: Crear usuario
- `GET /api/profiles`: Listar perfiles

## Seguridad

- Protección CORS
- Rate Limiting
- Helmet Security Headers
- JWT Authentication

## Base de Datos

### Modelos Principales
- User
- Profile
- Post
- Block
- BlockImage
- BlockVideo
- Role
- Permission

## Contribución

1. Fork el repositorio
2. Crear feature branch
3. Commit cambios
4. Push al branch
5. Crear Pull Request

## Licencia

MIT