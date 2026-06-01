# Components Agent

## Objetivo

Definir cómo deben construirse, estructurarse y utilizarse todos los componentes del frontend.

Este agente es responsable de:

- arquitectura de componentes,
- estructura interna,
- reutilización,
- relaciones entre componentes,
- responsabilidades,
- comunicación entre componentes,
- comportamiento esperado,
- composición visual y funcional.

Debe garantizar componentes:

- reutilizables,
- desacoplados,
- mantenibles,
- escalables,
- modulares,
- consistentes.

---

# Responsabilidades

Debe definir:

- estructura de componentes,
- responsabilidades individuales,
- composición,
- props esperadas,
- estados visuales,
- relaciones jerárquicas,
- reutilización,
- momento de uso,
- integración con hooks y services.

---

# Arquitectura de Componentes

Los componentes deben dividirse en:

```txt id="7yzzn1"
components/
├── ui/
├── layout/
├── dashboard/
├── table/
├── charts/
├── forms/
├── modal/
├── buttons/
├── feedback/
└── shared/
```

---

# Principios de Construcción

Todo componente debe:

- tener una única responsabilidad,
- ser reutilizable,
- evitar lógica compleja,
- evitar llamadas HTTP,
- recibir datos por props,
- mantener separación entre UI y lógica,
- soportar escalabilidad.

---

# Reglas Globales

- No lógica de negocio dentro de componentes visuales.
- No fetch directo desde componentes.
- Toda lógica reutilizable debe abstraerse.
- Mantener composición limpia.
- Priorizar reutilización.
- Evitar componentes gigantes.
- Mantener props tipadas y organizadas.
- Mantener consistencia visual y funcional.

---

# Relación Arquitectónica

Los componentes deben consumir:

```txt id="djlwm4"
UI Component
→ Hook
→ Service
→ Backend API
```

Nunca:

```txt id="m1v4jo"
Component
→ API directamente
```

---

# Tipos de Componentes

---

# Layout Components

Responsables de:

- estructura global,
- navegación,
- distribución visual,
- organización de páginas.

Incluye:

- PageLayout
- Sidebar
- Header
- PageContainer
- ContentWrapper

---

# Shared Components

Componentes reutilizables globales.

Incluye:

- Card
- Badge
- Divider
- Tooltip
- Loader
- EmptyState
- ConfirmDialog

Deben ser:

- pequeños,
- desacoplados,
- reutilizables.

---

# Dashboard Components

Responsables de:

- métricas,
- KPIs,
- balances,
- resúmenes,
- indicadores rápidos.

Incluye:

- Dashboard
- SummaryCard
- MetricsGrid
- FinancialSummary
- ActivitySummary

---

# Table Components

Responsables de:

- renderizado de datos,
- filtros,
- paginación,
- sorting,
- acciones.

Incluye:

- Table
- TableHeader
- TableRow
- TableFilters
- TablePagination
- TableActions

---

# Comportamiento de Tables

Deben soportar:

- búsqueda,
- filtros dinámicos,
- acciones configurables,
- estados visuales,
- renderizado dinámico,
- gran volumen de datos.

---

# Modal Components

Responsables de:

- formularios,
- confirmaciones,
- advertencias,
- visualizaciones.

Incluye:

- Modal
- ConfirmModal
- WarningModal
- FormModal
- ViewModal

---

# Comportamiento de Modals

Deben:

- mantener foco operativo,
- bloquear fondo,
- soportar formularios dinámicos,
- manejar estados loading,
- manejar confirmaciones críticas.

---

# Form Components

Responsables de:

- captura de datos,
- validaciones visuales,
- manejo de errores,
- feedback inmediato.

Incluye:

- Form
- Input
- Select
- Textarea
- Checkbox
- DatePicker
- CurrencyInput

---

# Comportamiento de Formularios

Deben soportar:

- validaciones inline,
- estados error,
- estados loading,
- disabled state,
- feedback inmediato,
- submit controlado.

---

# Chart Components

Responsables de:

- visualización de métricas,
- representación financiera,
- indicadores gráficos.

Incluye:

- LineChart
- BarChart
- PieChart
- SummaryChart

---

# Comportamiento de Charts

Deben:

- recibir datos dinámicos,
- ser reutilizables,
- soportar responsive,
- mantener consistencia visual,
- evitar saturación visual.

---

# Feedback Components

Responsables de:

- mostrar estados del sistema,
- comunicar operaciones,
- mostrar errores y confirmaciones.

Incluye:

- Toast
- Alert
- ErrorMessage
- SuccessMessage
- LoadingOverlay

---

# Botones

## Tipos

- PrimaryButton
- SecondaryButton
- DangerButton
- IconButton

---

# Comportamiento de Botones

Deben soportar:

- loading,
- disabled,
- hover,
- confirmaciones críticas,
- iconografía opcional.

---

# Relación entre Componentes

La composición debe seguir:

```txt id="d4k2ko"
Page
 ├── Dashboard
 ├── ActionsBar
 ├── Filters
 ├── Table
 │    ├── TableHeader
 │    ├── TableRow
 │    ├── TableActions
 │    └── Pagination
 └── Modals
```

---

# Flujo de Uso

Los componentes deben activarse según el flujo operativo:

```txt id="jlwmr7"
Usuario
→ Página
→ Acción
→ Modal/Formulario
→ Validación
→ Confirmación
→ Actualización visual
```

---

# Props y Configuración

Los componentes deben ser configurables mediante props.

Ejemplos:

- columns,
- data,
- actions,
- filters,
- loading,
- disabled,
- permissions,
- status.

---

# Estados Visuales

Todos los componentes deben soportar:

- loading,
- success,
- error,
- warning,
- disabled,
- empty,
- processing,
- hover,
- selected.

---

# Comunicación entre Componentes

La comunicación debe realizarse mediante:

- props,
- callbacks,
- context,
- hooks compartidos.

Debe evitar:

- acoplamiento directo,
- dependencias circulares,
- manejo global innecesario.

---

# Escalabilidad

Los componentes deben permitir:

- nuevos módulos,
- nuevas entidades,
- nuevos dashboards,
- nuevas tablas,
- nuevas acciones,
- nuevas métricas.

Sin romper componentes existentes.

---

# Organización de Carpetas

```txt id="mjlwm5"
components/
├── ui/
├── layout/
├── dashboard/
├── table/
├── charts/
├── forms/
├── modal/
├── feedback/
├── buttons/
└── shared/
```

---

# Naming Convention

Los componentes deben:

- usar PascalCase,
- tener nombres explícitos,
- representar claramente su responsabilidad.

---

# Objetivo Final

Construir una arquitectura de componentes:

- modular,
- reutilizable,
- desacoplada,
- consistente,
- mantenible,
- escalable,
- alineada con la arquitectura frontend del sistema.
