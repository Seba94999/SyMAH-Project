import { formatCurrency } from "../utils/formatters.js";
import { apiDelete, apiGet, apiPatch, apiPost } from "./apiClient.js";

const TRABAJOS_STATUS = {
  enCurso: "En curso",
  enPausa: "En pausa",
  finalizado: "Finalizado",
  cancelado: "Cancelado",
};

export function getTrabajosBase() {
  return apiGet("/trabajos");
}

export function getTrabajosResumen(trabajos = []) {
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
  return apiPost("/trabajos", trabajo);
}

export function updateTrabajo(trabajoId, patch) {
  return apiPatch(`/trabajos/${trabajoId}`, patch);
}

export async function deleteTrabajo(trabajoId) {
  await apiDelete(`/trabajos/${trabajoId}`);
  return true;
}

export { TRABAJOS_STATUS, formatCurrency };
