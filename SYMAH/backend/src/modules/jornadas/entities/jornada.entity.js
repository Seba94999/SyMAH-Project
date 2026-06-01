const {
  assertNonEmptyString,
  assertNumber,
  assertIsoDate,
  assertTime,
} = require("../../../shared/utils/assertions");

function createJornada(raw) {
  assertNonEmptyString(raw.id, "id");
  assertNonEmptyString(raw.empleadoId, "empleadoId");
  assertNonEmptyString(raw.trabajoId, "trabajoId");
  assertIsoDate(raw.fecha, "fecha");
  assertTime(raw.inicio, "inicio");
  assertTime(raw.fin, "fin");
  assertNumber(raw.duracionHoras, "duracionHoras", { min: 0 });

  return {
    id: raw.id,
    empleadoId: raw.empleadoId,
    trabajoId: raw.trabajoId,
    fecha: raw.fecha,
    inicio: raw.inicio,
    fin: raw.fin,
    duracionHoras: raw.duracionHoras,
    notas: typeof raw.notas === "string" ? raw.notas.trim() : "",
  };
}

module.exports = { createJornada };
