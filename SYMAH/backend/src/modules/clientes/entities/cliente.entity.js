const {
  assertNonEmptyString,
  assertEnum,
} = require("../../../shared/utils/assertions");

const CLIENTE_ESTADOS = ["activo", "enRiesgo", "inactivo"];

function createCliente(raw) {
  assertNonEmptyString(raw.id, "id");
  assertNonEmptyString(raw.nombre, "nombre");
  assertNonEmptyString(raw.direccion, "direccion");
  assertEnum(raw.estado, CLIENTE_ESTADOS, "estado");

  return {
    id: raw.id,
    nombre: raw.nombre.trim(),
    direccion: raw.direccion.trim(),
    estado: raw.estado,
    correo: typeof raw.correo === "string" ? raw.correo.trim() : "",
    telefono: typeof raw.telefono === "string" ? raw.telefono.trim() : "",
  };
}

module.exports = {
  CLIENTE_ESTADOS,
  createCliente,
};
