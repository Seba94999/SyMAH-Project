import { formatCurrency } from "../utils/formatters.js";
import { apiDelete, apiGet, apiPatch, apiPost } from "./apiClient.js";

const PRESUPUESTOS_STATUS = {
  pendiente: "Pendiente",
  aprobado: "Aprobado",
  rechazado: "Rechazado",
};

export function getPresupuestosBase() {
  return apiGet("/presupuestos");
}

export function getPresupuestosResumen(presupuestos = []) {
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
  return apiPost("/presupuestos", presupuesto);
}

export function updatePresupuesto(presupuestoId, patch) {
  return apiPatch(`/presupuestos/${presupuestoId}`, patch);
}

export async function deletePresupuesto(presupuestoId) {
  await apiDelete(`/presupuestos/${presupuestoId}`);
  return true;
}

export { PRESUPUESTOS_STATUS, formatCurrency };
