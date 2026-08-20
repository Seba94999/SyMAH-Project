import { formatCurrency } from "../utils/formatters.js";
import { apiDelete, apiGet, apiPatch, apiPost } from "./apiClient.js";

export const FINANZAS_TIPOS = {
  ingreso: "Ingreso",
  cobro: "Cobro",
  gasto: "Gasto",
  pago: "Pago",
};

export const TRANSACCIONES_TIPOS = FINANZAS_TIPOS;

export function getFinanzasMovimientos() {
  return apiGet("/transacciones");
}

export function getTransacciones() {
  return getFinanzasMovimientos();
}

export function getFinanzasResumen(movimientos = []) {
  const ingresos = movimientos
    .filter((item) => item.tipo === "ingreso" || item.tipo === "cobro")
    .reduce((total, item) => total + item.monto, 0);
  const gastos = movimientos
    .filter((item) => item.tipo === "gasto" || item.tipo === "pago")
    .reduce((total, item) => total + item.monto, 0);
  const neto = ingresos - gastos;

  return {
    totalMovimientos: movimientos.length,
    ingresos,
    gastos,
    neto,
  };
}

export function filtrarMovimientos(
  movimientos,
  { busqueda = "", filtroTipo = "todos" } = {},
) {
  const termino = busqueda.trim().toLowerCase();

  return movimientos.filter((movimiento) => {
    const coincideTipo =
      filtroTipo === "todos" || movimiento.tipo === filtroTipo;
    const coincideBusqueda =
      termino.length === 0 ||
      movimiento.concepto.toLowerCase().includes(termino) ||
      movimiento.id.toLowerCase().includes(termino) ||
      (movimiento.referencia || "").toLowerCase().includes(termino) ||
      (movimiento.entidadOrigenId || "").toLowerCase().includes(termino) ||
      (movimiento.entidadDestinoId || "").toLowerCase().includes(termino) ||
      (movimiento.observaciones || "").toLowerCase().includes(termino);

    return coincideTipo && coincideBusqueda;
  });
}

export function obtenerVarianteMovimientoTipo(tipo) {
  if (tipo === "ingreso" || tipo === "cobro") return "success";
  if (tipo === "gasto") return "danger";
  return "primary";
}

export function createMovimiento(movimiento) {
  return apiPost("/transacciones", movimiento);
}

export function createTransaccion(transaccion) {
  return createMovimiento(transaccion);
}

export function updateMovimiento(movimientoId, patch) {
  return apiPatch(`/transacciones/${movimientoId}`, patch);
}

export function updateTransaccion(transaccionId, patch) {
  return updateMovimiento(transaccionId, patch);
}

export async function deleteMovimiento(movimientoId) {
  await apiDelete(`/transacciones/${movimientoId}`);
  return true;
}

export async function deleteTransaccion(transaccionId) {
  return deleteMovimiento(transaccionId);
}

export { formatCurrency };
