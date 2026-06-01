const {
  assertNonEmptyString,
  assertEnum,
  assertNumber,
} = require("../../../shared/utils/assertions");

const EMPLEADO_ESTADOS = ["activo", "inactivo"];
const JORNADAS_VALIDAS = ["Completa", "Parcial"];

function createEmpleado(raw) {
  assertNonEmptyString(raw.id, "id");
  assertNonEmptyString(raw.nombre, "nombre");
  assertNonEmptyString(raw.cargo, "cargo");
  assertNonEmptyString(raw.sede, "sede");
  assertEnum(raw.estado, EMPLEADO_ESTADOS, "estado");
  assertEnum(raw.jornada, JORNADAS_VALIDAS, "jornada");
  assertNumber(raw.salario, "salario", { min: 0 });
  assertNumber(raw.horasMes, "horasMes", { min: 0 });

  return {
    id: raw.id,
    nombre: raw.nombre.trim(),
    cargo: raw.cargo.trim(),
    sede: raw.sede.trim(),
    estado: raw.estado,
    jornada: raw.jornada,
    salario: raw.salario,
    horasMes: raw.horasMes,
    ultimaActividad:
      typeof raw.ultimaActividad === "string" ? raw.ultimaActividad.trim() : "",
  };
}

module.exports = { createEmpleado, EMPLEADO_ESTADOS, JORNADAS_VALIDAS };
