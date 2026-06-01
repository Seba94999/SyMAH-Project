# Backend Communication Agent

## Objetivo

Gestionar toda la comunicación entre frontend y backend.

Este agente es responsable de:

- comunicación con APIs,
- obtención de datos,
- envío de información,
- sincronización frontend-backend,
- manejo de estados asincrónicos,
- transformación de datos,
- integración con lógica frontend,
- actualización visual.

Debe garantizar una comunicación:

- desacoplada,
- consistente,
- reutilizable,
- segura,
- escalable,
- mantenible.

---

# Responsabilidades

Debe encargarse de:

- requests HTTP,
- integración con endpoints,
- manejo de respuestas,
- transformación de payloads,
- manejo de errores,
- estados loading,
- invalidación de datos,
- sincronización visual.

---

# Arquitectura Obligatoria

La comunicación debe seguir:

```txt id="r6n0vq"
UI
→ Hooks
→ Services
→ API Client
→ Backend
```

Nunca:

```txt id="jlwmr8"
Component
→ Backend directamente
```

---

# Reglas Globales

- No fetch directo desde componentes.
- Toda comunicación debe pasar por services.
- Los hooks gestionan estados frontend.
- Los services gestionan comunicación backend.
- Mantener separación entre UI y networking.
- Centralizar manejo de errores.
- Centralizar configuración HTTP.
- Mantener consistencia de respuestas.

---

# Estructura

```txt id="n0g4mj"
frontend/
├── api/
├── services/
├── hooks/
├── validators/
└── adapters/
```

---

# API Layer

## Responsabilidad

Gestionar:

- cliente HTTP,
- baseURL,
- timeout,
- headers,
- interceptores,
- autenticación futura,
- manejo global de errores.

---

# API Client

Debe centralizar:

- configuración HTTP,
- tokens futuros,
- interceptores request/response,
- control global de errores.

---

# Services

## Responsabilidad

Los services deben gestionar:

- requests,
- endpoints,
- payloads,
- transformación de datos,
- composición de requests,
- integración backend.

---

# Organización de Services

```txt id="6p2wzq"
services/
├── employee.service.ts
├── jobs.service.ts
├── payments.service.ts
├── expenses.service.ts
├── loans.service.ts
├── budgets.service.ts
└── dashboard.service.ts
```

---

# Hooks

## Responsabilidad

Los hooks deben gestionar:

- loading,
- success,
- error,
- processing,
- sincronización UI,
- invalidación,
- cache temporal,
- actualización visual.

---

# Relación Arquitectónica

```txt id="2p8d0j"
Component
→ Hook
→ Service
→ API Client
→ Backend
```

---

# Obtención de Datos

Toda obtención de datos debe:

- manejar loading,
- manejar errores,
- validar respuestas,
- sincronizar estados,
- actualizar UI automáticamente,
- soportar retry controlado.

---

# Envío de Datos

Toda operación de escritura debe:

- validar payloads,
- manejar errores,
- bloquear múltiples submits,
- manejar processing state,
- actualizar información relacionada,
- sincronizar visualización.

---

# Transformación de Datos

La transformación debe realizarse mediante:

- adapters,
- mappers,
- normalizers.

Nunca dentro de componentes UI.

---

# Validación de Respuestas

Toda respuesta backend debe validar:

- estructura,
- tipos de datos,
- integridad operativa,
- estados esperados.

---

# Manejo de Errores

Debe centralizar:

- errores HTTP,
- errores de validación,
- errores de red,
- timeouts,
- errores operativos.

---

# Comportamiento de Errores

El frontend debe:

- mostrar mensajes claros,
- mantener consistencia visual,
- evitar ruptura UI,
- permitir recuperación operativa.

---

# Estados Asincrónicos

Todo request debe soportar:

- idle,
- loading,
- success,
- error,
- retry,
- processing.

---

# Cache y Sincronización

Debe soportar:

- invalidación de datos,
- refresh automático,
- actualización parcial,
- sincronización visual,
- re-fetch controlado.

---

# Integración con Componentes

Los componentes deben:

- consumir hooks,
- renderizar según estado,
- reaccionar a cambios asincrónicos.

Nunca consumir services directamente.

---

# Integración con Frontend Logic

La lógica frontend debe:

- validar antes de enviar,
- interpretar respuestas backend,
- controlar restricciones,
- actualizar comportamiento visual.

---

# Comunicación con Dashboards

Los dashboards deben:

- consumir datos agregados,
- soportar refresh dinámico,
- sincronizar métricas,
- manejar loading states.

---

# Comunicación con Tables

Las tablas deben soportar:

- paginación backend,
- filtros backend,
- sorting backend,
- búsqueda dinámica,
- actualización automática.

---

# Comunicación con Formularios

Los formularios deben:

- validar antes del submit,
- manejar errores backend,
- bloquear submits inválidos,
- mostrar feedback inmediato,
- actualizar estados relacionados.

---

# Integridad Operativa

La comunicación debe garantizar:

- consistencia de datos,
- sincronización frontend-backend,
- ausencia de estados parciales,
- manejo correcto de errores.

---

# Seguridad

Debe soportar:

- autenticación futura,
- autorización futura,
- tokens,
- refresh tokens,
- headers seguros,
- validaciones backend.

---

# Escalabilidad

La arquitectura debe permitir:

- nuevos endpoints,
- nuevas entidades,
- nuevos módulos,
- múltiples backends futuros,
- microservicios futuros.

---

# Naming Convention

## Services

```txt id="jlwmx9"
entity.service.ts
```

---

## Hooks

```txt id="q6nzjm"
useEntity.ts
```

---

## API

```txt id="k0r1o8"
apiClient.ts
```

---

# Flujo General

```txt id="6p9n3r"
Usuario
→ Component
→ Hook
→ Service
→ API Client
→ Backend
→ Response
→ Hook
→ UI Update
```

---

# Objetivo Final

Construir una arquitectura de comunicación:

- desacoplada,
- consistente,
- reutilizable,
- escalable,
- segura,
- mantenible,
- alineada con la arquitectura frontend y la lógica del negocio.
