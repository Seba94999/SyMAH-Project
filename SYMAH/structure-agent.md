Actúa como un arquitecto senior de sistemas IA multiagente especializado en:

- GitHub Copilot
- Arquitectura modular
- Sistemas multiagente
- Frontend React
- Backend Node.js
- Clean Architecture
- Arquitectura cliente-servidor

# OBJETIVO

Generar la estructura completa del sistema de agentes IA del proyecto SYMAH.

El sistema utilizará:

- GitHub Copilot
- Agentes especializados
- Skills reutilizables
- Orquestación jerárquica

La finalidad es asistir el desarrollo del sistema completo mediante prompts estructurados y especializados.

# IMPORTANTE

NO generar lógica de negocio real.
NO generar componentes completos.
NO generar endpoints reales.

SOLO:

- estructura
- prompts
- agentes
- responsabilidades
- documentación
- plantillas
- skills
- ejemplos mínimos

# ARQUITECTURA GENERAL

La arquitectura será:

Project Orchestrator
├── Backend Orchestrator
│ ├── Entities Agent
│ ├── Business Logic Agent
│ ├── Persistence Agent
│ ├── API Agent
│ └── Frontend Communication Agent
│
└── Frontend Orchestrator
├── UI/UX Agent
├── Frontend Logic Agent
├── Backend Communication Agent
└── Components Agent

# ESTRUCTURA A GENERAR

agents/
│
├── orchestrator/
│ ├── project-orchestrator.md
│ ├── backend-orchestrator.md
│ └── frontend-orchestrator.md
│
├── backend/
│ ├── index-agent.md
│ ├── entities-agent.md
│ ├── business-logic-agent.md
│ ├── persistence-agent.md
│ ├── api-agent.md
│ ├── frontend-communication-agent.md
│ │
│ └── skills/
│ ├── create-module.md
│ ├── create-schema.md
│ ├── create-controller.md
│ ├── create-service.md
│ ├── create-repository.md
│ ├── transaction-handler.md
│ ├── audit-handler.md
│ └── validations.md
│
├── frontend/
│ ├── index-agent.md
│ ├── ui-ux-agent.md
│ ├── frontend-logic-agent.md
│ ├── backend-communication-agent.md
│ ├── components-agent.md
│ │
│ └── skills/
│ ├── create-page.md
│ ├── create-component.md
│ ├── create-dashboard.md
│ ├── create-table.md
│ ├── create-modal.md
│ ├── create-form.md
│ ├── create-chart.md
│ ├── create-hook.md
│ ├── create-service.md
│ └── route-handler.md
│
├── architecture/
│ ├── modularization-agent.md
│ ├── clean-architecture-agent.md
│ ├── naming-conventions-agent.md
│ └── scalability-agent.md
│
└── shared/
├── documentation-agent.md
├── testing-agent.md
└── security-agent.md

# REGLAS IMPORTANTES

Cada agente debe incluir:

- Rol
- Responsabilidades
- Restricciones
- Entradas esperadas
- Salidas esperadas
- Convenciones
- Ejemplos
- Skills relacionadas

# RESTRICCIONES ARQUITECTÓNICAS

1. El frontend nunca debe contener reglas de negocio críticas.
2. El backend es responsable de:
   - atomicidad
   - integridad
   - cálculos contables
   - auditoría
3. Los agentes no deben superponer responsabilidades.
4. Las skills deben ser reutilizables.
5. La arquitectura debe ser escalable.
6. Mantener separación estricta entre:
   - UI
   - lógica
   - persistencia
   - API
   - comunicación
7. Toda generación debe priorizar:
   - reutilización
   - mantenibilidad
   - modularidad
   - desacoplamiento

# FORMATO DE CADA AGENTE

Cada archivo .md debe contener:

# Nombre del Agente

## Rol

## Responsabilidades

## Nunca debe hacer

## Siempre debe hacer

## Entradas esperadas

## Salidas esperadas

## Reglas arquitectónicas

## Convenciones

## Ejemplos de prompts

## Skills relacionadas

# SKILLS

Cada skill debe incluir:

- objetivo
- entradas
- salidas
- restricciones
- ejemplos

# RESULTADO ESPERADO

Generar:

- todos los archivos
- estructura completa
- contenido base de cada agente
- skills base
- documentación inicial
- prompts reutilizables
- placeholders listos para evolucionar
