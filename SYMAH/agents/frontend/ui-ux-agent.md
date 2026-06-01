# UI-UX Agent

## Objetivo

Definir toda la construcción visual y experiencial del frontend.

La interfaz debe transmitir:

- claridad,
- profesionalismo,
- orden,
- velocidad operativa,
- jerarquía visual limpia.

Debe evitar completamente:

- estilos neon,
- glassmorphism,
- efectos glow,
- saturación visual,
- interfaces gaming,
- estéticas futuristas exageradas.

El diseño debe alinearse con:

- dashboards SaaS modernos,
- sistemas administrativos,
- plataformas ERP/CRM,
- aplicaciones empresariales escalables.

---

# Sistema Visual Global

## Estilo General

La interfaz debe ser:

- clara,
- minimalista,
- administrativa,
- modular,
- moderna,
- profesional,
- basada en superficies claras.

---

# Paleta de Colores

## Color Primario

Uso:

- acciones primarias,
- botones principales,
- navegación activa,
- highlights operativos.

Color:

```txt
#2563EB
```

Hover:

```txt
#1D4ED8
```

Soft:

```txt
rgba(37,99,235,0.10)
```

Focus:

```txt
rgba(37,99,235,0.15)
```

---

## Color Secundario

Uso:

- sidebar,
- títulos auxiliares,
- navegación secundaria,
- indicadores operativos.

Color:

```txt
#1E293B
```

---

## Fondo General

Color:

```txt
#F8FAFC
```

---

## Superficies

Cards, tablas y paneles:

```txt
background: #FFFFFF
border: 1px solid #E2E8F0
```

---

## Bordes

Color:

```txt
#E2E8F0
```

---

## Texto Principal

Color:

```txt
#0F172A
```

---

## Texto Secundario

Color:

```txt
#64748B
```

---

# Estados Visuales

## Success

```txt
#16A34A
```

Soft:

```txt
rgba(22,163,74,0.12)
```

---

## Error

```txt
#DC2626
```

Soft:

```txt
rgba(220,38,38,0.12)
```

---

## Warning

```txt
#D97706
```

Soft:

```txt
rgba(217,119,6,0.12)
```

---

## Info

```txt
#0284C7
```

Soft:

```txt
rgba(2,132,199,0.12)
```

---

# Tipografía

## Fuente Principal

```txt
Inter
```

Fallback:

```txt
sans-serif
```

---

# Jerarquía Tipográfica

## Título Principal

- 32px
- weight 700
- line-height 40px

---

## Título Secundario

- 24px
- weight 600

---

## Subtítulos

- 18px
- weight 600

---

## Texto Principal

- 14px
- weight 400
- line-height 24px

---

## Texto Secundario

- 13px
- color #64748B

---

# Espaciado

Sistema basado en múltiplos de:

```txt
8px
```

Escalas:

- XS → 4px
- SM → 8px
- MD → 16px
- LG → 24px
- XL → 32px
- XXL → 48px

---

# Layout General

```txt
App
 └── PageLayout
      ├── Sidebar
      ├── Header
      ├── Dashboard
      ├── Content
      └── Modals
```

---

# Sidebar

## Configuración

- ancho 260px
- fondo blanco
- borde derecho #E2E8F0
- altura completa
- scroll independiente

---

## Navegación Activa

```txt
background: rgba(37,99,235,0.10)
color: #2563EB
```

---

## Navegación Inactiva

```txt
color: #64748B
```

Hover:

```txt
background: #F1F5F9
```

---

# Header

## Configuración

- altura 72px
- sticky top
- fondo blanco
- borde inferior #E2E8F0

Debe evitar:

- blur excesivo,
- transparencias,
- overlays oscuros,
- efectos glow.

---

# Contenedor Principal

## Configuración

- padding horizontal 32px
- padding vertical 24px
- max-width adaptable

---

# Cards

## Configuración

```txt
background: #FFFFFF
border: 1px solid #E2E8F0
border-radius: 16px
box-shadow: 0 2px 8px rgba(0,0,0,0.05)
```

---

# Tables

## Headers

```txt
background: #F8FAFC
color: #64748B
```

---

## Rows

```txt
background: #FFFFFF
border-bottom: 1px solid #F1F5F9
```

Hover:

```txt
background: #F8FAFC
```

---

# Badges

## En Curso

```txt
background: rgba(2,132,199,0.12)
color: #0284C7
```

---

## Finalizado

```txt
background: rgba(22,163,74,0.12)
color: #16A34A
```

---

## En Pausa

```txt
background: rgba(217,119,6,0.12)
color: #D97706
```

---

## Cancelado

```txt
background: rgba(220,38,38,0.12)
color: #DC2626
```

---

# Inputs

## Configuración

```txt
height: 44px
background: #FFFFFF
border: 1px solid #E2E8F0
border-radius: 10px
padding: 0 12px
```

Focus:

```txt
border-color: #2563EB
box-shadow: 0 0 0 3px rgba(37,99,235,0.15)
```

---

# Botones

## Primario

```txt
background: #2563EB
color: #FFFFFF
```

Hover:

```txt
background: #1D4ED8
```

---

## Secundario

```txt
background: #FFFFFF
border: 1px solid #E2E8F0
color: #0F172A
```

---

## Destructivo

```txt
background: #DC2626
color: #FFFFFF
```

---

# Modals

## Configuración

```txt
background: #FFFFFF
border-radius: 16px
box-shadow: 0 8px 24px rgba(0,0,0,0.12)
```

Overlay:

```txt
background: rgba(15,23,42,0.45)
```

---

# Charts

Paleta permitida:

```txt
Primary → #2563EB
Success → #16A34A
Warning → #D97706
Info → #0284C7
Error → #DC2626
```

Debe evitar:

- neon,
- gradients extremos,
- glow,
- fondos oscuros.

---

# Sombras

## Cards

```txt
0 2px 8px rgba(0,0,0,0.05)
```

---

## Modals

```txt
0 8px 24px rgba(0,0,0,0.12)
```

---

# Motion & Animaciones

## Objetivo

Las animaciones deben:

- mejorar claridad visual,
- reforzar feedback,
- transmitir fluidez,
- mejorar percepción de calidad,
- optimizar experiencia operativa.

Deben evitar:

- animaciones exageradas,
- rebotes,
- efectos gaming,
- motion innecesario,
- transiciones lentas.

---

# Timing Global

## Fast

Uso:

- hover,
- focus,
- botones.

```txt
120ms
```

---

## Normal

Uso:

- cards,
- tablas,
- contenido dinámico.

```txt
180ms
```

---

## Slow

Uso:

- modals,
- navegación,
- overlays.

```txt
240ms
```

---

# Easing

Easing principal:

```txt
cubic-bezier(0.4, 0, 0.2, 1)
```

---

# Hover Effects

## Botones

```txt
transform: translateY(-1px)
transition: 120ms
```

---

## Cards

```txt
transform: translateY(-2px)
box-shadow: 0 4px 12px rgba(0,0,0,0.08)
transition: 180ms
```

---

## Navigation Items

```txt
background: #F1F5F9
transform: translateX(2px)
```

---

# Fade In

Uso:

- dashboards,
- cards,
- tablas,
- contenido dinámico.

```txt
opacity: 0 → 1
transform: translateY(6px) → 0
duration: 180ms
```

---

# Modals

## Apertura

```txt
opacity: 0 → 1
transform: scale(0.96) → scale(1)
duration: 240ms
```

---

## Cierre

```txt
duration: 160ms
```

---

# Tables

## Row Hover

```txt
background: #F8FAFC
transition: 120ms
```

---

## Skeleton Loading

```txt
background:
linear-gradient(
90deg,
#F1F5F9 25%,
#E2E8F0 50%,
#F1F5F9 75%
)
```

Animación:

```txt
1.2s infinite
```

---

# Dropdowns

## Apertura

```txt
opacity: 0 → 1
transform: translateY(-4px) → 0
duration: 180ms
```

---

# Toasts

## Entrada

```txt
opacity: 0 → 1
transform: translateX(12px) → 0
duration: 180ms
```

---

## Salida

```txt
opacity: 1 → 0
duration: 120ms
```

---

# Page Transitions

```txt
opacity: 0 → 1
transform: translateY(8px) → 0
duration: 180ms
```

---

# Disabled States

```txt
opacity: 0.5
pointer-events: none
```

---

# Responsive Motion

En mobile:

- reducir duración 20%,
- minimizar transformaciones,
- evitar animaciones pesadas.

---

# Accesibilidad

Debe soportarse:

```txt
prefers-reduced-motion
```

Reduciendo:

- transforms,
- transitions,
- animations.

---

# UX Operacional

La interfaz debe priorizar:

- lectura rápida,
- mínima cantidad de pasos,
- feedback inmediato,
- navegación clara,
- productividad operativa.

---

# Objetivo Final

Construir una interfaz:

- administrativa,
- moderna,
- limpia,
- clara,
- profesional,
- escalable,
- consistente,
- modular,
- enfocada en productividad,
- alineada con plataformas SaaS modernas.
