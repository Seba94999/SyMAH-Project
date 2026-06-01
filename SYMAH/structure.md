Actúa como un arquitecto de software senior especializado en arquitectura cliente-servidor, React, Node.js y proyectos modulares escalables.

Necesito generar la estructura inicial completa del proyecto SYMAH bajo una arquitectura monorepo.

# CONTEXTO DEL SISTEMA

El sistema es un panel administrativo financiero-operativo para:

- gestión de empleados
- gestión de trabajos
- gestión de clientes
- gestión financiera
- presupuestos
- transacciones
- auditoría
- métricas e informes

La arquitectura debe cumplir:

- Frontend → React + Vite
- Backend → Node.js + JavaScript
- Base de datos → MongoDB
- Arquitectura → Cliente-Servidor
- Código modular y escalable
- Separación estricta de responsabilidades

IMPORTANTE:

- El frontend NO debe contener reglas de negocio críticas.
- El backend será responsable de:
  - integridad transaccional
  - cálculos contables
  - auditoría
  - atomicidad
  - validaciones críticas

# OBJETIVO

Genera ÚNICAMENTE la estructura inicial del directorio del proyecto.

NO generes lógica de negocio.
NO generes código funcional complejo.
NO generes endpoints.
NO generes componentes completos.

SOLO:

- carpetas
- archivos base
- placeholders mínimos
- configuración inicial

# ESTRUCTURA GENERAL DESEADA

Crear un monorepo:

SYMAH/
├── frontend/
├── backend/
├── docs/
├── agents/
├── skills/
├── prompts/
├── shared/
├── .github/
├── package.json
└── README.md

# FRONTEND

Dentro de frontend crear:

frontend/
├── public/
├── src/
│ ├── app/
│ ├── routes/
│ ├── layout/
│ ├── pages/
│ │ ├── dashboard/
│ │ ├── clientes/
│ │ ├── trabajos/
│ │ ├── empleados/
│ │ ├── finanzas/
│ │ └── presupuestos/
│ │
│ ├── components/
│ │ ├── ui/
│ │ ├── dashboard/
│ │ ├── tables/
│ │ ├── charts/
│ │ ├── forms/
│ │ ├── modals/
│ │ ├── navigation/
│ │ └── feedback/
│ │
│ ├── services/
│ ├── hooks/
│ ├── context/
│ ├── models/
│ ├── constants/
│ ├── utils/
│ ├── styles/
│ └── assets/
│
├── package.json
├── vite.config.js
└── jsconfig.json

# BACKEND

Dentro de backend crear:

backend/
├── src/
│ ├── config/
│ ├── modules/
│ │ ├── empleados/
│ │ ├── clientes/
│ │ ├── trabajos/
│ │ ├── finanzas/
│ │ ├── presupuestos/
│ │ ├── transacciones/
│ │ └── auditoria/
│ │
│ ├── shared/
│ │ ├── middleware/
│ │ ├── errors/
│ │ ├── utils/
│ │ ├── database/
│ │ └── validators/
│ │
│ ├── routes/
│ ├── app.js
│ └── server.js
│
├── package.json
└── .env.example

# AGENTS

Crear:

agents/
├── orchestrator.md
├── frontend/
│ ├── react-agent.md
│ ├── ui-agent.md
│ ├── table-agent.md
│ ├── forms-agent.md
│ └── routing-agent.md
│
├── backend/
│ ├── api-agent.md
│ ├── transaction-agent.md
│ ├── mongodb-agent.md
│ └── validation-agent.md
│
└── architecture/
├── modularization-agent.md
└── clean-architecture-agent.md

# SKILLS

Crear:

skills/
├── react/
├── backend/
├── ui/
├── architecture/
└── business-rules/

# REQUISITOS IMPORTANTES

1. Crear archivos placeholder mínimos:
   - index.js
   - README.md
   - .gitkeep
   - App.jsx
   - main.jsx
   - app.js
   - server.js

2. Configurar frontend con:
   - React
   - Vite
   - React Router

3. Configurar backend con:
   - Express
   - estructura modular

4. Crear aliases de importación:
   - @components
   - @pages
   - @services
   - @hooks
   - @utils

5. Generar:
   - package.json básicos
   - scripts iniciales
   - configuración mínima

6. Crear README inicial explicando:
   - propósito del proyecto
   - arquitectura
   - estructura

7. Mantener separación estricta:
   - frontend
   - backend
   - IA agents
   - skills

# ESTILO

- arquitectura limpia
- modular
- escalable
- mantenible
- reusable
- preparada para crecimiento empresarial

# RESULTADO ESPERADO

Quiero:

- estructura completa
- árbol de directorios
- contenido mínimo de archivos base
- configuración inicial lista para comenzar desarrollo
- todo preparado para abrir en VSCode y comenzar a trabajar
