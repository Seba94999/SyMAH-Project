const {
  assertNonEmptyString,
  assertEnum,
  assertNumber,
} = require("../../../shared/utils/assertions");

const CLIENTE_ESTADOS = ["activo", "enRiesgo", "inactivo"];

function createCliente(raw) {
  assertNonEmptyString(raw.id, "id");
  assertNonEmptyString(raw.nombre, "nombre");
  assertNonEmptyString(raw.rubro, "rubro");
  assertNonEmptyString(raw.ciudad, "ciudad");
  assertEnum(raw.estado, CLIENTE_ESTADOS, "estado");
  assertNonEmptyString(raw.contacto, "contacto");
  assertNonEmptyString(raw.correo, "correo");
  assertNonEmptyString(raw.telefono, "telefono");
  assertNumber(raw.balancePendiente, "balancePendiente", { min: 0 });

  return {
    id: raw.id,
    nombre: raw.nombre.trim(),
    rubro: raw.rubro.trim(),
    ciudad: raw.ciudad.trim(),
    estado: raw.estado,
    contacto: raw.contacto.trim(),
    correo: raw.correo.trim(),
    telefono: raw.telefono.trim(),
    ultimoTrabajo:
      typeof raw.ultimoTrabajo === "string" ? raw.ultimoTrabajo.trim() : "",
    balancePendiente: raw.balancePendiente,
  };
}

module.exports = { createCliente, CLIENTE_ESTADOS };
