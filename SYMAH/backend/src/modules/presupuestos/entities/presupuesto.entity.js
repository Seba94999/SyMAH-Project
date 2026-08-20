const {
  assertNonEmptyString,
  assertCondition,
  assertEnum,
  assertNumber,
  assertIsoDate,
} = require("../../../shared/utils/assertions");

const PRESUPUESTO_ESTADOS = ["pendiente", "aprobado", "rechazado"];

function normalizePresupuestoPdf(rawPdf) {
  if (rawPdf === undefined || rawPdf === null) {
    return null;
  }

  assertNonEmptyString(rawPdf, "presupuesto");

  const pdfDataUrlPattern = /^data:application\/pdf(;base64)?,/;
  assertCondition(
    pdfDataUrlPattern.test(rawPdf),
    "presupuesto must be a PDF file encoded as a data URL",
    {
      fieldName: "presupuesto",
    },
  );

  return rawPdf.trim();
}

function normalizeClienteRegistrado(rawClienteRegistrado) {
  if (rawClienteRegistrado === undefined || rawClienteRegistrado === null) {
    return true;
  }

  assertCondition(
    typeof rawClienteRegistrado === "boolean",
    "clienteRegistrado must be a boolean",
    {
      fieldName: "clienteRegistrado",
    },
  );

  return rawClienteRegistrado;
}

function createPresupuesto(raw) {
  assertNonEmptyString(raw.id, "id");
  assertNonEmptyString(raw.cliente, "cliente");
  assertNonEmptyString(raw.descripcion, "descripcion");
  assertEnum(raw.estado, PRESUPUESTO_ESTADOS, "estado");
  assertIsoDate(raw.fecha, "fecha");
  assertNumber(raw.monto, "monto", { min: 0 });

  return {
    id: raw.id,
    cliente: raw.cliente.trim(),
    descripcion: raw.descripcion.trim(),
    estado: raw.estado,
    fecha: raw.fecha,
    monto: raw.monto,
    presupuesto: normalizePresupuestoPdf(raw.presupuesto),
    clienteRegistrado: normalizeClienteRegistrado(raw.clienteRegistrado),
    trabajo:
      typeof raw.trabajo === "string" && raw.trabajo.trim().length > 0
        ? raw.trabajo.trim()
        : null,
  };
}

module.exports = { createPresupuesto, PRESUPUESTO_ESTADOS };
