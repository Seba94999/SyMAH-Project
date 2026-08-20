const {
  assertNonEmptyString,
  assertEnum,
  assertNumber,
  assertIsoDate,
} = require("../../../shared/utils/assertions");

const EMPLEADO_ESTADOS = ["activo", "inactivo"];
const JORNADAS_VALIDAS = ["Completa", "Parcial"];

function createEmpleado(raw) {
  assertNonEmptyString(raw.id, "id");
  assertNonEmptyString(raw.nombre, "nombre");
  assertNonEmptyString(raw.cargo, "cargo");
  assertEnum(raw.estado, EMPLEADO_ESTADOS, "estado");
  assertEnum(raw.jornada, JORNADAS_VALIDAS, "jornada");

  const saldo = Number(raw.saldo ?? raw.saldoPorPagar ?? 0);
  const horasMes = Number(raw.horasMes ?? 0);
  const tarifaPorHora = Number(raw.tarifaPorHora ?? 0);
  const pagado = Number(raw.pagado ?? 0);
  const saldoPorPagar = Math.max(saldo, 0);

  assertNumber(saldo, "saldo", { min: 0 });
  assertNumber(horasMes, "horasMes", { min: 0 });
  assertNumber(tarifaPorHora, "tarifaPorHora", { min: 0 });
  assertNumber(pagado, "pagado", { min: 0 });

  return {
    id: raw.id,
    nombre: raw.nombre.trim(),
    cargo: raw.cargo.trim(),
    sede: typeof raw.sede === "string" ? raw.sede.trim() : "",
    estado: raw.estado,
    jornada: raw.jornada,
    saldo,
    horasMes,
    tarifaPorHora,
    pagado,
    saldoPorPagar,
    transacciones: Array.isArray(raw.transacciones) ? raw.transacciones : [],
    ultimaActividad:
      typeof raw.ultimaActividad === "string" ? raw.ultimaActividad.trim() : "",
  };
}

module.exports = { createEmpleado, EMPLEADO_ESTADOS, JORNADAS_VALIDAS };
