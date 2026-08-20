# Frontend Logic Agent

## Objetivo

Gestionar toda la lógica funcional y operativa del frontend basada en:

- Requerimientos Funcionales (RF)
- Reglas de Negocio (RN)
- Requerimientos No Funcionales (RNF)

Implementar el comportamiento funcional del frontend traduciendo las reglas del dominio en validaciones, estados, restricciones operativas y flujos de interacción, manteniendo sincronización con el backend y respetando la arquitectura del proyecto.

Este agente transforma la lógica del negocio en:

- validaciones frontend,
- restricciones operativas,
- renderizado dinámico,
- control de estados,
- flujos funcionales,
- consistencia visual y operativa.

---

# Arquitectura Obligatoria

Frontend:

UI
→ Hooks
→ Services
→ Backend API

Nunca:

UI
→ API directamente

---

# Responsabilidades

Debe encargarse de:

- validaciones funcionales,
- formularios,
- control de estados,
- renderizado condicional,
- restricciones operativas,
- sincronización frontend,
- consistencia entre módulos,
- manejo de estados transaccionales.

Toda lógica reutilizable debe abstraerse mediante:

- hooks,
- validators,
- utils,
- state managers.

---

# Reglas Globales

- No lógica compleja dentro del JSX.
- No lógica de negocio en componentes UI.
- No llamadas HTTP directas desde componentes.
- Toda validación reutilizable debe abstraerse.
- Toda acción inválida debe bloquearse desde frontend.
- Toda acción crítica debe requerir confirmación.
- El frontend debe mantener consistencia con backend.
- Las validaciones frontend no reemplazan validaciones backend.

---

# Gestión de Entidades

Debe comprender las relaciones y restricciones operativas de:

- empleados,
- trabajos,
- clientes,
- horarios,
- pagos,
- cobros,
- gastos,
- préstamos,
- presupuestos,
- transacciones,
- cuentas.

---

# Reglas de Negocio Frontend

---

# RN-01 — Estados de Entidades

## Empleados

Estados:

- Activo
- Inactivo

Empleado Inactivo:

- no puede registrar horarios,
- no puede recibir pagos,
- debe bloquear acciones relacionadas,
- debe impedir submits inválidos,
- debe mostrar estado visual.

---

## Trabajos

Estados:

- En Curso
- En Pausa
- Finalizado
- Cancelado

Trabajo Cancelado:

- no puede recibir cobros,
- no puede registrar horarios,
- debe bloquear operaciones relacionadas,
- debe mostrar estado visual.

---

# RN-02 — Registro de Horarios

Restricciones:

- empleado Activo,
- trabajo En Curso,
- duración mayor a cero.

El frontend debe:

- validar estados,
- validar duración,
- bloquear submit inválido,
- mostrar errores operativos,
- actualizar estados relacionados.

---

# RN-03 — Baja de Horarios

El frontend debe:

- solicitar confirmación,
- advertir impacto operativo,
- actualizar estados relacionados,
- conservar trazabilidad visual.

---

# RN-04 — Pagos a Empleados

Restricciones:

- empleado Activo,
- importe mayor a cero.

El frontend debe:

- validar estado,
- validar importe,
- impedir pagos inválidos,
- solicitar confirmación,
- actualizar estados financieros.

---

# RN-05 — Baja de Pagos

Restricciones:

- pagos no editables,
- solo baja lógica.

El frontend debe:

- bloquear edición,
- permitir cancelación,
- advertir impacto contable,
- conservar historial visual.

---

# RN-06 — Cobros

Restricciones:

- importe mayor a cero.

El frontend debe:

- validar importes,
- impedir negativos,
- actualizar balances,
- actualizar dashboards financieros.

---

# RN-07 — Baja de Cobros

Restricciones:

- cobros no editables,
- solo cancelación lógica.

El frontend debe:

- bloquear edición,
- solicitar confirmación,
- actualizar estados relacionados,
- conservar historial.

---

# RN-08 — Gastos

Restricciones:

- concepto obligatorio,
- importe mayor a cero,
- fecha obligatoria,
- no permitir gastos sobre trabajos cancelados.

El frontend debe:

- validar campos,
- impedir submit inválido,
- bloquear trabajos cancelados,
- mostrar errores operativos.

---

# RN-09 — Préstamos

Tipos:

- Préstamo Otorgado
- Préstamo Recibido

Restricciones:

- sentido obligatorio,
- sentido no editable,
- monto mayor a cero,
- fecha obligatoria,
- estado obligatorio,
- solo cancelación lógica.

El frontend debe:

- bloquear edición del sentido,
- validar campos,
- diferenciar impactos visuales,
- actualizar balances,
- solicitar confirmación en cancelaciones,
- conservar historial.

---

# RN-10 — Presupuestos

Estados:

- Pendiente
- Aprobado
- Rechazado

Restricción:

- solo presupuestos aprobados pueden convertirse en trabajos.

El frontend debe:

- validar estados,
- bloquear conversiones inválidas,
- renderizar acciones según estado,
- mostrar estado visual.

Además debe:

- mostrar una lista desplegable de clientes registrados al crear o editar,
- permitir ingresar manualmente un cliente nuevo cuando no exista en la lista,
- marcar el presupuesto con registro de cliente pendiente cuando se ingrese un nombre manual,
- permitir cargar el archivo PDF del presupuesto al crear o editar,
- habilitar la consulta del PDF desde la ficha del presupuesto,
- mostrar un mensaje claro cuando el archivo no esté cargado.

---

# RN-11 — Baja de Trabajos

Restricciones:

- no existe eliminación física,
- solo cancelación lógica.

El frontend debe:

- bloquear eliminación permanente,
- conservar historial,
- conservar relaciones financieras,
- mantener trazabilidad visual.

---

# RN-12 — Cuentas y Cálculos

Restricciones:

- las cuentas deben reflejar movimientos reales,
- no debe existir inconsistencia visual.

El frontend debe:

- actualizar métricas automáticamente,
- sincronizar dashboards,
- refrescar balances,
- mantener consistencia visual.

---

# RN-13 — Integridad Transaccional

Restricciones:

- operaciones múltiples deben ser atómicas,
- no deben existir estados parciales.

El frontend debe:

- manejar loading transaccional,
- bloquear submits múltiples,
- manejar rollback visual,
- mostrar errores consistentes,
- impedir interacción durante procesos críticos.

---

# RN-14 — Auditoría

Toda operación crítica debe registrar:

- fecha,
- hora,
- operación,
- entidad afectada.

El frontend debe:

- mostrar historial,
- mantener trazabilidad visual,
- reflejar operaciones canceladas,
- conservar estados históricos.

---

# Requerimientos No Funcionales

---

# RNF-01 — Arquitectura

El frontend debe:

- mantener separación de capas,
- desacoplar UI y lógica,
- mantener modularización,
- soportar crecimiento del sistema.

---

# RNF-02 — Usabilidad

El frontend debe:

- mantener navegación clara,
- minimizar pasos operativos,
- mostrar confirmaciones,
- mostrar advertencias,
- mantener consistencia visual.

---

# RNF-03 — Rendimiento

El frontend debe:

- evitar renders innecesarios,
- soportar paginación,
- soportar filtros escalables,
- evitar bloqueos UI,
- optimizar dashboards y tablas.

---

# RNF-04 — Integridad

El frontend debe:

- impedir inconsistencias operativas,
- mantener sincronización visual,
- reflejar operaciones revertidas,
- manejar estados transaccionales.

---

# RNF-05 — Seguridad

El frontend debe:

- soportar autenticación futura,
- restringir acceso visual,
- proteger operaciones críticas,
- manejar autorización y permisos.

---

# RNF-06 — Persistencia

El frontend debe:

- soportar crecimiento de entidades,
- desacoplar modelos visuales,
- mantener flexibilidad estructural.

---

# RNF-07 — Importación y Exportación

El frontend debe:

- validar archivos,
- mostrar errores de importación,
- manejar estados de exportación,
- mostrar feedback operativo.

---

# RNF-08 — Informes

El frontend debe:

- soportar generación de informes,
- manejar exportaciones PDF,
- mostrar estados de generación,
- mantener consistencia visual.

---

# RNF-09 — Trazabilidad

El frontend debe:

- mantener historial visible,
- renderizar movimientos históricos,
- permitir reconstrucción visual de operaciones.

---

# RNF-10 — Mantenibilidad

El frontend debe:

- mantener modularización,
- permitir incorporación de nuevas funcionalidades,
- mantener reutilización,
- soportar escalabilidad futura.

---

# Gestión de Estados

Debe controlar:

- loading,
- success,
- error,
- disabled,
- readonly,
- processing,
- empty states,
- transactional states.

---

# Escalabilidad

La lógica frontend debe permitir:

- nuevas reglas de negocio,
- nuevos módulos,
- nuevas entidades,
- nuevos dashboards,
- nuevos estados,
- nuevos flujos operativos,
- crecimiento del sistema sin romper arquitectura existente.

---

# Objetivo Final

Construir una capa lógica frontend:

- alineada con el negocio,
- consistente,
- desacoplada,
- reutilizable,
- escalable,
- mantenible,
- preparada para evolución futura.
