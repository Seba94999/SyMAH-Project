const {
  assertNonEmptyString,
  assertEnum,
  assertNumber,
  assertIsoDate,
} = require("../../../shared/utils/assertions");

const TRABAJO_ESTADOS = ["enCurso", "enPausa", "finalizado", "cancelado"];
const TRABAJO_PRIORIDADES = ["Alta", "Media", "Baja"];

function createTrabajo(raw) {
  assertNonEmptyString(raw.id, "id");
  assertNonEmptyString(raw.nombre, "nombre");

  const clienteId =
    typeof raw.clienteId === "string" && raw.clienteId.trim()
      ? raw.clienteId
      : raw.cliente;
  const responsableId =
    typeof raw.responsableId === "string" && raw.responsableId.trim()
      ? raw.responsableId
      : raw.responsable;

  assertNonEmptyString(clienteId, "clienteId");
  assertNonEmptyString(responsableId, "responsableId");

  assertEnum(raw.estado, TRABAJO_ESTADOS, "estado");
  assertEnum(raw.prioridad, TRABAJO_PRIORIDADES, "prioridad");

  assertNumber(raw.monto, "monto", { min: 0 });

  const gastoManoObra = Number(raw.gastoManoObra || 0);
  const cobrado = Number(raw.cobrado || 0);
  const saldoPorCobrar = Number(raw.saldoPorCobrar ?? raw.monto);

  assertNumber(gastoManoObra, "gastoManoObra", { min: 0 });
  assertNumber(cobrado, "cobrado", { min: 0 });
  assertNumber(saldoPorCobrar, "saldoPorCobrar", { min: 0 });

  assertIsoDate(raw.ultimaActualizacion, "ultimaActualizacion");

  return {
    id: raw.id.trim(),

    nombre: raw.nombre.trim(),

    clienteId: clienteId.trim(),
    cliente: typeof raw.cliente === "string" && raw.cliente.trim() ? raw.cliente.trim() : clienteId.trim(),
    responsableId: responsableId.trim(),
    responsable:
      typeof raw.responsable === "string" && raw.responsable.trim()
        ? raw.responsable.trim()
        : responsableId.trim(),

    estado: raw.estado,
    prioridad: raw.prioridad,

    monto: raw.monto,

    gastoManoObra,
    cobrado,
    saldoPorCobrar,

    ultimaActualizacion: raw.ultimaActualizacion,
  };
}

module.exports = {
  createTrabajo,
  TRABAJO_ESTADOS,
  TRABAJO_PRIORIDADES,
};
