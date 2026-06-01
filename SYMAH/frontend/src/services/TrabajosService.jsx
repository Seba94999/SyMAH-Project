import { formatCurrency } from "../utils/formatters.js";

const TRABAJOS_STATUS = {
  enCurso: "En curso",
  enPausa: "En pausa",
  finalizado: "Finalizado",
  cancelado: "Cancelado",
};

let TRABAJOS_BASE = [
  {
    id: "TR-001",
    nombre: "Mantención estructura norte",
    cliente: "Constructora Valle Azul",
    responsable: "Ana Torres",
    estado: "enCurso",
    prioridad: "Alta",
    progreso: 72,
    monto: 18500000,
    ultimaActualizacion: "2026-05-26",
  },
  {
    id: "TR-002",
    nombre: "Revisión patio de carga",
    cliente: "Logistica Ruta Sur",
    responsable: "Marco Fuentes",
    estado: "enPausa",
    prioridad: "Media",
    progreso: 41,
    monto: 9200000,
    ultimaActualizacion: "2026-05-23",
  },
  {
    id: "TR-003",
    nombre: "Acondicionamiento pabellón B",
    cliente: "Clinica San Gabriel",
    responsable: "Carla Medina",
    estado: "finalizado",
    prioridad: "Alta",
    progreso: 100,
    monto: 12400000,
    ultimaActualizacion: "2026-05-20",
  },
  {
    id: "TR-004",
    nombre: "Remodelación sala de ventas",
    cliente: "Mercados del Pacífico",
    responsable: "Pedro Silva",
    estado: "cancelado",
    prioridad: "Baja",
    progreso: 18,
    monto: 6700000,
    ultimaActualizacion: "2026-05-16",
  },
  {
    id: "TR-005",
    nombre: "Inspección de líneas internas",
    cliente: "Energia Nova",
    responsable: "Ana Torres",
    estado: "enCurso",
    prioridad: "Media",
    progreso: 58,
    monto: 10400000,
    ultimaActualizacion: "2026-05-27",
  },
];

export function getTrabajosBase() {
  return TRABAJOS_BASE;
}

function generarTrabajoId() {
  const last = TRABAJOS_BASE[TRABAJOS_BASE.length - 1];
  const nextNumber = last ? Number(last.id.split("-")[1]) + 1 : 1;
  return `TR-${String(nextNumber).padStart(3, "0")}`;
}

export function getTrabajosResumen(trabajos = TRABAJOS_BASE) {
  const enCurso = trabajos.filter(
    (trabajo) => trabajo.estado === "enCurso",
  ).length;
  const finalizados = trabajos.filter(
    (trabajo) => trabajo.estado === "finalizado",
  ).length;
  const cancelados = trabajos.filter(
    (trabajo) => trabajo.estado === "cancelado",
  ).length;
  const presupuestoTotal = trabajos.reduce(
    (total, trabajo) => total + trabajo.monto,
    0,
  );

  return {
    total: trabajos.length,
    enCurso,
    finalizados,
    cancelados,
    presupuestoTotal,
  };
}

export function filtrarTrabajos(
  trabajos,
  { busqueda = "", filtroEstado = "todos" } = {},
) {
  const termino = busqueda.trim().toLowerCase();

  return trabajos.filter((trabajo) => {
    const coincideEstado =
      filtroEstado === "todos" || trabajo.estado === filtroEstado;
    const coincideBusqueda =
      termino.length === 0 ||
      trabajo.nombre.toLowerCase().includes(termino) ||
      trabajo.id.toLowerCase().includes(termino) ||
      trabajo.cliente.toLowerCase().includes(termino) ||
      trabajo.responsable.toLowerCase().includes(termino);

    return coincideEstado && coincideBusqueda;
  });
}

export function obtenerVarianteTrabajoEstado(estado) {
  if (estado === "enCurso") return "success";
  if (estado === "enPausa") return "warning";
  if (estado === "finalizado") return "primary";
  return "danger";
}

export function createTrabajo(trabajo) {
  const nuevoTrabajo = {
    ...trabajo,
    id: generarTrabajoId(),
  };

  TRABAJOS_BASE = [...TRABAJOS_BASE, nuevoTrabajo];
  return nuevoTrabajo;
}

export function updateTrabajo(trabajoId, patch) {
  let updatedTrabajo = null;

  TRABAJOS_BASE = TRABAJOS_BASE.map((trabajo) => {
    if (trabajo.id !== trabajoId) {
      return trabajo;
    }

    updatedTrabajo = { ...trabajo, ...patch, id: trabajo.id };
    return updatedTrabajo;
  });

  return updatedTrabajo;
}

export function deleteTrabajo(trabajoId) {
  const exists = TRABAJOS_BASE.some((trabajo) => trabajo.id === trabajoId);
  TRABAJOS_BASE = TRABAJOS_BASE.filter((trabajo) => trabajo.id !== trabajoId);
  return exists;
}

export { TRABAJOS_STATUS, formatCurrency };
