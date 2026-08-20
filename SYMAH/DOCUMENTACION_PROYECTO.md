# Documentación del proyecto SYMAH

## 1. Introducción

SYMAH es una aplicación full-stack para la gestión operativa y financiera de una empresa o taller. El sistema combina un backend en Node.js con Express y MongoDB, y un frontend en React con Vite para gestionar clientes, empleados, trabajos, presupuestos, finanzas y jornadas laborales.

La solución está organizada como un monorepo con dos proyectos principales:

- backend: API REST y lógica de negocio
- frontend: interfaz web de gestión

---

## 2. Stack tecnológico

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- Arquitectura modular por dominio

### Frontend
- React 18
- Vite
- React Router DOM
- Fetch nativo para consumo de la API

### Gestión del proyecto
- pnpm
- workspace monorepo

---

## 3. Estructura general del proyecto

```text
SYMAH/
├─ backend/
│  ├─ src/
│  │  ├─ app.js
│  │  ├─ server.js
│  │  ├─ config/
│  │  │  └─ database.js
│  │  ├─ modules/
│  │  │  ├─ clientes/
│  │  │  ├─ empleados/
│  │  │  ├─ finanzas/
│  │  │  ├─ jornadas/
│  │  │  ├─ presupuestos/
│  │  │  ├─ trabajos/
│  │  │  └─ transacciones/
│  │  ├─ routes/
│  │  │  ├─ crud-router.js
│  │  │  └─ index.js
│  │  └─ shared/
│  │     ├─ errors/
│  │     ├─ persistence/
│  │     └─ utils/
│  ├─ package.json
│  └─ test/
├─ frontend/
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ layout/
│  │  ├─ pages/
│  │  ├─ routes/
│  │  ├─ services/
│  │  ├─ styles/
│  │  └─ utils/
│  ├─ package.json
│  └─ vite.config.js
├─ package.json
├─ pnpm-workspace.yaml
├─ scripts/
└─ DOCUMENTACION_PROYECTO.md
```

---

## 4. Backend

### 4.1. Arquitectura

El backend sigue una estructura modular por entidad funcional. Cada módulo tiene una organización similar:

```text
modulo/
├─ entities/
├─ persistence/
├─ repositories/
├─ services/
├─ module.js
```

Además, existe una capa común de rutas con un generador de CRUD básico.

### 4.2. Punto de entrada

La aplicación inicia desde:

- backend/src/server.js
- backend/src/app.js

El archivo app.js establece:

- CORS
- parseo de JSON y formularios
- conexión a la base de datos antes de atender peticiones API
- middleware global para manejo de errores

La ruta raíz de la API se monta en `/api`.

### 4.3. Rutas principales

El archivo `backend/src/routes/index.js` define los endpoints principales:

```text
GET /api/health
GET /api/clientes
GET /api/clientes/:id
POST /api/clientes
PATCH /api/clientes/:id
DELETE /api/clientes/:id

GET /api/empleados
GET /api/empleados/:id
POST /api/empleados
PATCH /api/empleados/:id
DELETE /api/empleados/:id

GET /api/trabajos
GET /api/trabajos/:id
POST /api/trabajos
PATCH /api/trabajos/:id
DELETE /api/trabajos/:id

GET /api/presupuestos
GET /api/presupuestos/:id
POST /api/presupuestos
PATCH /api/presupuestos/:id
DELETE /api/presupuestos/:id

GET /api/transacciones
GET /api/transacciones/:id
POST /api/transacciones
PATCH /api/transacciones/:id
DELETE /api/transacciones/:id

GET /api/finanzas
GET /api/finanzas/:id
POST /api/finanzas
PATCH /api/finanzas/:id
DELETE /api/finanzas/:id

GET /api/jornadas
GET /api/jornadas/:id
POST /api/jornadas
PATCH /api/jornadas/:id
DELETE /api/jornadas/:id
```

El router base genérico está implementado en `backend/src/routes/crud-router.js`, y permite reutilizar la lógica CRUD para la mayoría de los módulos.

### 4.4. Módulos de negocio

#### Clientes
- Modelo: `Cliente`
- Campos principales:
  - codigo
  - nombre
  - direccion
  - estado
  - correo
  - telefono
- Estados permitidos: `activo`, `enRiesgo`, `inactivo`

#### Empleados
- Modelo: `Empleado`
- Campos principales:
  - codigo
  - nombre
  - cargo
  - sede
  - estado
  - jornada
  - saldo
  - horasMes
  - tarifaPorHora
  - pagado
  - ultimaActividad

#### Trabajos
- Modelo: `Trabajo`
- Relación con Cliente y Empleado
- Campos principales:
  - codigo
  - nombre
  - cliente (ObjectId)
  - responsable (ObjectId)
  - estado
  - prioridad
  - monto
  - gastoManoObra
  - cobrado
  - saldoPorCobrar
  - ultimaActualizacion

#### Presupuestos
- Modelo: `Presupuesto`
- Relación con Cliente y Trabajo
- Campos importantes:
  - codigo
  - cliente
  - descripcion
  - estado
  - fecha
  - monto
  - presupuesto (archivo o referencia)
  - clienteRegistrado
  - trabajo

#### Transacciones
- Modelo: `Transaccion`
- Es la capa central de movimientos financieros.
- Campos principales:
  - codigo
  - tipo
  - fecha
  - monto
  - concepto
  - observaciones
  - estado
  - cliente
  - entidadOrigen / entidadDestino
  - entidadOrigenId / entidadDestinoId
  - entidadOrigenModel / entidadDestinoModel

#### Finanzas
- Se gestiona a través de transacciones y resúmenes financieros.
- Se usa para consolidar movimientos de ingreso/gasto/pago/cobro.

#### Jornadas
- Se gestionan jornadas relacionadas con empleados y trabajos.
- El router de jornadas tiene un resolver especial para obtener registros por empleado o trabajo.

### 4.5. Conexión a base de datos

La conexión está definida en `backend/src/config/database.js`:

```js
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/symah")
```

Esto implica:

- base de datos por defecto: `symah`
- host local: `127.0.0.1:27017`
- posibilidad de configurar otra URI con variable de entorno `MONGO_URI`

### 4.6. Manejo de errores

El backend usa un `DomainError` para centralizar errores de negocio. En el middleware global se responde con:

- status 400 para errores de dominio
- status 500 para errores inesperados

---

## 5. Base de datos

### 5.1. Motor

El proyecto usa MongoDB con Mongoose.

Esto significa que la base de datos es NoSQL, con colecciones y documentos en formato JSON-like.

### 5.2. Colecciones principales

#### clientes
Documentos de clientes con campos como:
- codigo
- nombre
- direccion
- estado
- correo
- telefono

#### empleados
Documentos de personal con campos de información operativa y financiera:
- codigo
- nombre
- cargo
- sede
- estado
- jornada
- saldo
- horasMes
- tarifaPorHora
- pagado

#### trabajos
Colección de proyectos o trabajos realizados para clientes.

Relaciones:
- `cliente` -> referencia a `Cliente`
- `responsable` -> referencia a `Empleado`

#### presupuestos
Documentos de cotizaciones o presupuestos creados para clientes y/o trabajos.

Relaciones:
- `cliente` -> referencia a `Cliente`
- `trabajo` -> referencia a `Trabajo`

#### transacciones
Colección central para movimientos financieros.

Relaciones dinámicas:
- `cliente`
- `entidadOrigenId` + `entidadOrigenModel`
- `entidadDestinoId` + `entidadDestinoModel`

Esto permite enlazar transacciones con varios tipos de entidad:
- Cliente
- Empleado
- Trabajo
- Jornada

#### jornadas
Colección que registra turnos o jornadas laborales asociadas a empleados y trabajos.

### 5.3. Relación entre entidades

El esquema principal del dominio es:

```text
Cliente 1 --- N Trabajo
Cliente 1 --- N Presupuesto
Cliente 1 --- N Transaccion
Empleado 1 --- N Trabajo
Empleado 1 --- N Jornada
Empleado 1 --- N Transaccion
Trabajo 1 --- N Presupuesto
Trabajo 1 --- N Transaccion
Trabajo 1 --- N Jornada
```

### 5.4. Validaciones relevantes

Las entidades cuentan con validaciones de `required`, `enum`, `default` y `min` en los schemas de Mongoose.

Ejemplos:
- `estado` en clientes con valores permitidos
- `estado` y `prioridad` en trabajos
- `tipo` y `estado` en transacciones
- `codigo` único en varias colecciones

### 5.5. Consideraciones recomendadas

- Usar índices en campos consultados con frecuencia (`codigo`, `estado`, `cliente`, `responsable`, `tipo`).
- Mantener una política de validación consistente para fechas y montos.
- Definir un esquema de entorno con variables `.env` para `MONGO_URI`.
- Considerar migraciones o scripts de seed para carga inicial de datos.

---

## 6. Frontend

### 6.1. Arquitectura

El frontend está construido con React + Vite y sigue una estructura orientada a vistas y hooks personalizados.

### 6.2. Entrada principal

Los archivos principales son:

- frontend/src/main.jsx
- frontend/src/App.jsx
- frontend/src/routes/routes.jsx

El `BrowserRouter` se monta en `main.jsx`, y las rutas de la aplicación se resuelven en `routes.jsx`.

### 6.3. Rutas de la app

Las rutas principales definidas por `AppRoutes` son:

```text
/
/clientes
/empleados
/trabajos
/finanzas
/presupuestos
```

El componente `AppLayout` envuelve las páginas principales.

### 6.4. Patrones de frontend

El proyecto usa una combinación de:

- componentes reutilizables
- páginas por dominio
- hooks para lógica de datos
- servicios para consumo de APIs
- estilos separados por módulo

### 6.5. Servicios API

La capa de servicios está en `frontend/src/services`:

- apiClient.js
- ClientesService.jsx
- EmpleadosService.jsx
- FinanzasService.jsx
- JornadasService.jsx
- PresupuestosService.jsx
- TrabajosService.jsx

El `apiClient` centraliza la comunicación con la API mediante `fetch` y gestiona:

- headers JSON
- parsing de respuestas
- manejo de errores HTTP
- respuesta vacía en `204`

### 6.6. Hooks principales

Los hooks personalizados se encuentran en `frontend/src/hooks`:

- useClientes
- useEmpleados
- useFinanzas
- useJornadas
- usePresupuestos
- useTrabajos

Ejemplo de patrón:

- carga inicial de datos con `useEffect`
- estado local para búsquedas y filtros
- métodos `create`, `update`, `remove`
- actualización del estado visual tras operaciones

### 6.7. Páginas claves

- Dashboard
- ClientesPage
- EmpleadosPage
- TrabajosPage
- FinanzasPage
- PresupuestosPage

El sistema presenta un enfoque basado en paneles y tablas con experiencia de administración operativa.

### 6.8. Flujo de datos frontend

```text
Usuario -> Página -> Hook -> Servicio -> API REST -> Backend -> MongoDB
```

Y en sentido inverso:

```text
MongoDB -> Backend -> API -> Servicio -> Hook -> Estado React -> UI
```

---

## 7. Flujo de ejecución del sistema

### Backend

Desde la raíz del proyecto:

```bash
pnpm install
pnpm dev:backend
```

### Frontend

```bash
pnpm dev:frontend
```

### Ejecutar ambos simultáneamente

```bash
pnpm dev
```

---

## 8. Variables de entorno recomendadas

Se recomienda crear un archivo `.env` para el backend, por ejemplo:

```env
MONGO_URI=mongodb://127.0.0.1:27017/symah
FRONTEND_ORIGIN=http://localhost:5173
```

Para el frontend, si se requiere apuntar a otra API:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 9. Observaciones sobre la implementación actual

La base del proyecto ya está claramente estructurada con una separación funcional por dominios. Las fortalezas principales son:

- backend modular y reutilizable
- uso de Mongoose para persistencia
- API REST uniforme por CRUD
- frontend basado en hooks y servicios
- separación clara entre vistas, lógica y datos

Algunas mejoras recomendadas para later:

- normalizar rutas y nombres de archivos para eliminar `index.js` internos en algunos módulos
- añadir validaciones más explícitas a nivel de servicio para lógica de negocio
- definir controladores dedicados para endpoints complejos
- agregar tests automáticos para backend y frontend
- documentar contratos de API con OpenAPI/Swagger
- revisar consistencia de nombres de entidades y estrategias de persistencia

---

## 10. Resumen ejecutivo

SYMAH es un sistema de gestión con una estructura modular bien pensada para manejar procesos empresariales relacionados con clientes, personal, ejecución de trabajos, presupuestos y finanzas. El proyecto combina una API REST en Express con MongoDB y una interfaz React para ofrecer un flujo de trabajo completo de administración operativa.

La base del sistema está funcionalmente bien organizada, especialmente en la separación entre:

- backend: dominio y API
- frontend: consumo y presentación
- base de datos: persistencia y relaciones empresariales

---

## 11. Referencias rápidas

- Backend principal: `backend/src/app.js`
- Rutas API: `backend/src/routes/index.js`
- Router CRUD genérico: `backend/src/routes/crud-router.js`
- Conexión MongoDB: `backend/src/config/database.js`
- Frontend raíz: `frontend/src/App.jsx`
- Rutas React: `frontend/src/routes/routes.jsx`
- Servicios API: `frontend/src/services`
- Hooks: `frontend/src/hooks`

