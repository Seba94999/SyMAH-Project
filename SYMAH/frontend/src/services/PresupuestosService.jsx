import { formatCurrency } from "../utils/formatters.js";

const PRESUPUESTOS_STATUS = {
  pendiente: "Pendiente",
  aprobado: "Aprobado",
  rechazado: "Rechazado",
};

let PRESUPUESTOS_BASE = [
  {
    id: "PR-001",
    cliente: "Constructora Valle Azul",
    descripcion: "Mantenimiento preventivo de estructura",
    estado: "aprobado",
    fecha: "2026-05-22",
    monto: 18500000,
    probabilidad: 92,
    trabajoVinculado: "TR-001",
  },
  {
    id: "PR-002",
    cliente: "Logistica Ruta Sur",
    descripcion: "Revisión de patio y áreas de carga",
    estado: "pendiente",
    fecha: "2026-05-24",
    monto: 9200000,
    probabilidad: 63,
    trabajoVinculado: null,
  },
  {
    id: "PR-003",
    cliente: "Clinica San Gabriel",
    descripcion: "Acondicionamiento de pabellón B",
    estado: "aprobado",
    fecha: "2026-05-19",
    monto: 12400000,
    probabilidad: 96,
    trabajoVinculado: "TR-003",
  },
  {
    id: "PR-004",
    cliente: "Mercados del Pacífico",
    descripcion: "Remodelación de sala de ventas",
    estado: "rechazado",
    fecha: "2026-05-12",
    monto: 6700000,
    probabilidad: 28,
    trabajoVinculado: null,
  },
  {
    id: "PR-005",
    cliente: "Energia Nova",
    descripcion: "Inspección de líneas internas",
    estado: "pendiente",
    fecha: "2026-05-27",
    monto: 10400000,
    probabilidad: 74,
    trabajoVinculado: null,
  },
];

export function getPresupuestosBase() {
  return PRESUPUESTOS_BASE;
}

function generarPresupuestoId() {
  const last = PRESUPUESTOS_BASE[PRESUPUESTOS_BASE.length - 1];
  const nextNumber = last ? Number(last.id.split("-")[1]) + 1 : 1;
  return `PR-${String(nextNumber).padStart(3, "0")}`;
}

export function getPresupuestosResumen(presupuestos = PRESUPUESTOS_BASE) {
  const aprobados = presupuestos.filter(
    (item) => item.estado === "aprobado",
  ).length;
  const pendientes = presupuestos.filter(
    (item) => item.estado === "pendiente",
  ).length;
  const montoTotal = presupuestos.reduce(
    (total, item) => total + item.monto,
    0,
  );

  return {
    total: presupuestos.length,
    aprobados,
    pendientes,
    montoTotal,
  };
}

export function filtrarPresupuestos(
  presupuestos,
  { busqueda = "", filtroEstado = "todos" } = {},
) {
  const termino = busqueda.trim().toLowerCase();

  return presupuestos.filter((presupuesto) => {
    const coincideEstado =
      filtroEstado === "todos" || presupuesto.estado === filtroEstado;
    const coincideBusqueda =
      termino.length === 0 ||
      presupuesto.cliente.toLowerCase().includes(termino) ||
      presupuesto.id.toLowerCase().includes(termino) ||
      presupuesto.descripcion.toLowerCase().includes(termino);

    return coincideEstado && coincideBusqueda;
  });
}

export function obtenerVariantePresupuestoEstado(estado) {
  if (estado === "aprobado") return "success";
  if (estado === "pendiente") return "warning";
  return "danger";
}

export function createPresupuesto(presupuesto) {
  const nuevoPresupuesto = {
    ...presupuesto,
    id: generarPresupuestoId(),
  };

  PRESUPUESTOS_BASE = [...PRESUPUESTOS_BASE, nuevoPresupuesto];
  return nuevoPresupuesto;
}

export function updatePresupuesto(presupuestoId, patch) {
  let updatedPresupuesto = null;

  PRESUPUESTOS_BASE = PRESUPUESTOS_BASE.map((presupuesto) => {
    if (presupuesto.id !== presupuestoId) {
      return presupuesto;
    }

    updatedPresupuesto = { ...presupuesto, ...patch, id: presupuesto.id };
    return updatedPresupuesto;
  });

  return updatedPresupuesto;
}

export function deletePresupuesto(presupuestoId) {
  const exists = PRESUPUESTOS_BASE.some(
    (presupuesto) => presupuesto.id === presupuestoId,
  );
  PRESUPUESTOS_BASE = PRESUPUESTOS_BASE.filter(
    (presupuesto) => presupuesto.id !== presupuestoId,
  );
  return exists;
}

export { PRESUPUESTOS_STATUS, formatCurrency };
