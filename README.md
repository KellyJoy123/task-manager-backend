# Task Manager API

API RESTful para gestión de tareas personales desarrollada con **NestJS**.

---

## Índice

* [Descripción](#descripción)
* [Tecnologías utilizadas](#tecnologías-utilizadas)
* [Cómo funciona el sistema](#cómo-funciona-el-sistema)
* [Requisitos previos](#requisitos-previos)
* [Instalación y ejecución](#instalación-y-ejecución)
* [Estructura del proyecto](#estructura-del-proyecto)
* [Endpoints de la API](#endpoints-de-la-api)
* [Ejemplos de uso](#ejemplos-de-uso)
* [Variables de entorno](#variables-de-entorno)
* [Pruebas](#pruebas)
* [Licencia](#licencia)

---

## Descripción

Este proyecto es una API para gestionar tareas personales que permite a los usuarios:

* Crear nuevas tareas
* Ver todas las tareas existentes
* Actualizar el estado de una tarea (completada/no completada)
* Eliminar tareas

La API sigue los principios de **Clean Architecture**, separando claramente las capas de dominio, aplicación, infraestructura y presentación. Esto garantiza un código mantenible, testeable y escalable.

---

## Tecnologías utilizadas

| Tecnología        | Versión | Propósito                |
| ----------------- | ------- | ------------------------ |
| NestJS            | v10.x   | Framework backend        |
| TypeScript        | v5.x    | Tipado estático          |
| MongoDB Atlas     | -       | Base de datos en la nube |
| Mongoose          | v8.x    | ODM para MongoDB         |
| Swagger           | v7.x    | Documentación de API     |
| class-validator   | v0.14.x | Validación de datos      |
| class-transformer | v0.5.x  | Transformación de datos  |

---

## Cómo funciona el sistema

El sistema está construido siguiendo **Clean Architecture**, lo que significa que cada capa tiene una responsabilidad específica.

### Arquitectura

```text
┌─────────────────────────────────────────────────────────────┐
│ PRESENTATION LAYER                                          │
│ (Controllers / Swagger)                                     │
├─────────────────────────────────────────────────────────────┤
│ APPLICATION LAYER                                           │
│ (Use Cases / DTOs / Mappers)                                │
├─────────────────────────────────────────────────────────────┤
│ DOMAIN LAYER                                                │
│ (Entities / Interfaces / Rules)                             │
├─────────────────────────────────────────────────────────────┤
│ INFRASTRUCTURE LAYER                                        │
│ (Repositories / Schemas / Database)                         │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de una petición

1. Cliente envía una petición HTTP a la API.
2. Controller recibe la petición y valida los datos.
3. Use Case ejecuta la lógica de negocio.
4. Repository interactúa con la base de datos.
5. Response devuelve el resultado al cliente.

### Modelo de datos

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
```

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

### Node.js (v18 o superior)

```bash
node --version
```

### npm (v9 o superior)

```bash
npm --version
```

### MongoDB Atlas

Una cuenta gratuita es suficiente.

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/task-manager-backend.git
cd task-manager-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### Dependencias principales

| Dependencia              | Descripción               |
| ------------------------ | ------------------------- |
| @nestjs/common           | Módulos base de NestJS    |
| @nestjs/core             | Core de NestJS            |
| @nestjs/platform-express | Adaptador HTTP            |
| @nestjs/mongoose         | Integración con MongoDB   |
| @nestjs/config           | Variables de entorno      |
| @nestjs/swagger          | Documentación automática  |
| mongoose                 | ODM para MongoDB          |
| class-validator          | Validación de DTOs        |
| class-transformer        | Transformación de objetos |

### Dependencias de desarrollo

| Dependencia | Descripción                    |
| ----------- | ------------------------------ |
| @nestjs/cli | CLI para NestJS                |
| typescript  | Compilador de TypeScript       |
| ts-node     | Ejecutar TypeScript en Node.js |
| @types/node | Tipos para Node.js             |

### 3. Configurar variables de entorno

Crear archivo `.env`:

```bash
cp .env.example .env
```

Configurar:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority

PORT=3001
```

### 4. Ejecutar el proyecto

#### Desarrollo

```bash
npm run start:dev
```

#### Producción

```bash
npm run build
npm run start:prod
```

Salida esperada:

```text
🚀 API corriendo en: http://localhost:3001
📚 Swagger: http://localhost:3001/api/docs
✅ Conexión a MongoDB establecida
```

### 5. Probar la API

Abrir:

```text
http://localhost:3001/api/docs
```

---

## Estructura del proyecto

```text
task-manager-backend/
├── src/
│   ├── common/
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   └── pipes/
│   │       └── trim.pipe.ts
│   │
│   ├── modules/
│   │   └── tasks/
│   │       ├── domain/
│   │       │   ├── entities/
│   │       │   │   └── task.entity.ts
│   │       │   └── interfaces/
│   │       │       └── task.repository.interface.ts
│   │       │
│   │       ├── application/
│   │       │   ├── dto/
│   │       │   ├── use-cases/
│   │       │   └── mappers/
│   │       │
│   │       ├── infrastructure/
│   │       │   ├── schemas/
│   │       │   └── repositories/
│   │       │
│   │       └── presentation/
│   │           └── controllers/
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
```

---

## Endpoints de la API

| Método | Endpoint                 | Descripción              |
| ------ | ------------------------ | ------------------------ |
| GET    | `/api/tasks`             | Obtener todas las tareas |
| POST   | `/api/tasks`             | Crear una nueva tarea    |
| PUT    | `/api/tasks/{id}`        | Actualizar una tarea     |
| PATCH  | `/api/tasks/{id}/toggle` | Cambiar estado           |
| DELETE | `/api/tasks/{id}`        | Eliminar una tarea       |

### Crear tarea

```json
{
  "title": "Mi tarea",
  "description": "Descripción"
}
```

### Actualizar tarea

```json
{
  "title": "Nuevo título",
  "description": "Nueva descripción",
  "completed": true
}
```

### Respuesta

```json
{
  "id": "67f3c5f3d7a2b1c3d4e5f678",
  "title": "Mi tarea",
  "description": "Descripción",
  "completed": false,
  "createdAt": "2026-06-23T17:09:46.505Z",
  "updatedAt": "2026-06-23T17:09:46.505Z"
}
```

---

## Ejemplos de uso

### Crear una tarea

```bash
curl -X POST http://localhost:3001/api/tasks \
-H "Content-Type: application/json" \
-d '{
  "title": "Comprar despensa",
  "description": "Comprar frutas, verduras y carne"
}'
```

### Obtener tareas

```bash
curl -X GET http://localhost:3001/api/tasks
```

### Actualizar una tarea

```bash
curl -X PUT http://localhost:3001/api/tasks/67f3c5f3d7a2b1c3d4e5f678 \
-H "Content-Type: application/json" \
-d '{
  "title": "Comprar despensa completa",
  "description": "Comprar frutas, verduras, carne y lácteos"
}'
```

### Cambiar estado

```bash
curl -X PATCH http://localhost:3001/api/tasks/67f3c5f3d7a2b1c3d4e5f678/toggle
```

### Eliminar tarea

```bash
curl -X DELETE http://localhost:3001/api/tasks/67f3c5f3d7a2b1c3d4e5f678
```

---

## Variables de entorno

| Variable    | Descripción                     | Obligatorio | Valor por defecto |
| ----------- | ------------------------------- | ----------- | ----------------- |
| MONGODB_URI | URL de conexión a MongoDB Atlas | Sí          | -                 |
| PORT        | Puerto del servidor             | No          | 3001              |

### Ejemplo

```env
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
PORT=3001
```

---

## Pruebas

### Ejecutar pruebas unitarias

```bash
npm run test
```

### Ejecutar pruebas en modo watch

```bash
npm run test:watch
```

### Ver cobertura

```bash
npm run test:cov
```

---

## Licencia

Este proyecto está bajo la Licencia MIT.

---
