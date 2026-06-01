const {
  assertNonEmptyString,
  assertEnum,
  assertNumber,
  assertIsoDate,
} = require("../../../shared/utils/assertions");

const MOVIMIENTO_TIPOS = ["ingreso", "cobro", "gasto", "pago"];

function createMovimiento(raw) {
  assertNonEmptyString(raw.id, "id");
  assertEnum(raw.tipo, MOVIMIENTO_TIPOS, "tipo");
  assertNonEmptyString(raw.concepto, "concepto");
  assertNonEmptyString(raw.referencia, "referencia");
  assertIsoDate(raw.fecha, "fecha");
  assertNumber(raw.monto, "monto", { min: 0 });

  return {
    id: raw.id,
    tipo: raw.tipo,
    concepto: raw.concepto.trim(),
    referencia: raw.referencia.trim(),
    fecha: raw.fecha,
    monto: raw.monto,
  };
}

module.exports = { createMovimiento, MOVIMIENTO_TIPOS };
