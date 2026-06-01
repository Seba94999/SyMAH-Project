const {
  assertNonEmptyString,
  assertEnum,
  assertNumber,
  assertIsoDate,
} = require("../../../shared/utils/assertions");

const PRESUPUESTO_ESTADOS = ["pendiente", "aprobado", "rechazado"];

function createPresupuesto(raw) {
  assertNonEmptyString(raw.id, "id");
  assertNonEmptyString(raw.cliente, "cliente");
  assertNonEmptyString(raw.descripcion, "descripcion");
  assertEnum(raw.estado, PRESUPUESTO_ESTADOS, "estado");
  assertIsoDate(raw.fecha, "fecha");
  assertNumber(raw.monto, "monto", { min: 0 });
  assertNumber(raw.probabilidad, "probabilidad", { min: 0, max: 100 });

  return {
    id: raw.id,
    cliente: raw.cliente.trim(),
    descripcion: raw.descripcion.trim(),
    estado: raw.estado,
    fecha: raw.fecha,
    monto: raw.monto,
    probabilidad: raw.probabilidad,
    trabajoVinculado:
      typeof raw.trabajoVinculado === "string" &&
      raw.trabajoVinculado.trim().length > 0
        ? raw.trabajoVinculado.trim()
        : null,
  };
}

module.exports = { createPresupuesto, PRESUPUESTO_ESTADOS };
