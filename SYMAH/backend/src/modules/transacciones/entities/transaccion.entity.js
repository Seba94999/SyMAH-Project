const {
  assertNonEmptyString,
  assertEnum,
  assertNumber,
  assertIsoDate,
} = require("../../../shared/utils/assertions");

const TRANSACCION_TIPOS = [
  "ingreso",
  "cobro",
  "gasto",
  "pago",
  "jornada",
  "ajuste",
  "prestamo",
];

const TRANSACCION_ESTADOS = ["activa", "anulada", "revertida"];

function inferEntidadOrigen(raw) {
  if (typeof raw.entidadOrigen === "string" && raw.entidadOrigen.trim()) {
    return raw.entidadOrigen.trim();
  }

  return "";
}

function inferEntidadDestino(raw) {
  if (typeof raw.entidadDestino === "string" && raw.entidadDestino.trim()) {
    return raw.entidadDestino.trim();
  }

  if (raw.tipo === "cobro" || raw.tipo === "ingreso") {
    return "caja";
  }

  if (raw.tipo === "pago" || raw.tipo === "gasto") {
    return "tercero";
  }

  return "";
}

function createTransaccion(raw) {
  assertNonEmptyString(raw.id, "id");
  assertEnum(raw.tipo, TRANSACCION_TIPOS, "tipo");
  assertNonEmptyString(raw.concepto, "concepto");
  assertIsoDate(raw.fecha, "fecha");
  assertNumber(raw.monto, "monto", { min: 0 });

  const estado =
    typeof raw.estado === "string" && raw.estado.trim()
      ? raw.estado.trim()
      : "activa";

  assertEnum(estado, TRANSACCION_ESTADOS, "estado");

  return {
    id: raw.id,

    tipo: raw.tipo,
    fecha: raw.fecha,
    monto: raw.monto,

    concepto: raw.concepto.trim(),

    observaciones:
      typeof raw.observaciones === "string" ? raw.observaciones.trim() : "",

    estado,

    cliente: typeof raw.cliente === "string" ? raw.cliente.trim() : "",

    entidadOrigen: inferEntidadOrigen(raw),

    entidadOrigenId:
      typeof raw.entidadOrigenId === "string" ? raw.entidadOrigenId.trim() : "",

    entidadDestino: inferEntidadDestino(raw),

    entidadDestinoId:
      typeof raw.entidadDestinoId === "string"
        ? raw.entidadDestinoId.trim()
        : "",
  };
}

module.exports = {
  createTransaccion,
  TRANSACCION_ESTADOS,
  TRANSACCION_TIPOS,
};
