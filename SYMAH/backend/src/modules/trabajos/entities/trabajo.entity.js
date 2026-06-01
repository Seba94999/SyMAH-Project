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
  assertNonEmptyString(raw.cliente, "cliente");
  assertNonEmptyString(raw.responsable, "responsable");
  assertEnum(raw.estado, TRABAJO_ESTADOS, "estado");
  assertEnum(raw.prioridad, TRABAJO_PRIORIDADES, "prioridad");
  assertNumber(raw.progreso, "progreso", { min: 0, max: 100 });
  assertNumber(raw.monto, "monto", { min: 0 });
  assertIsoDate(raw.ultimaActualizacion, "ultimaActualizacion");

  return {
    id: raw.id,
    nombre: raw.nombre.trim(),
    cliente: raw.cliente.trim(),
    responsable: raw.responsable.trim(),
    estado: raw.estado,
    prioridad: raw.prioridad,
    progreso: raw.progreso,
    monto: raw.monto,
    ultimaActualizacion: raw.ultimaActualizacion,
  };
}

module.exports = { createTrabajo, TRABAJO_ESTADOS, TRABAJO_PRIORIDADES };
