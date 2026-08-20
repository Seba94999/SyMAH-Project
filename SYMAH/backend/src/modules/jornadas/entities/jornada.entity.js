const {
  assertNonEmptyString,
  assertIsoDate,
} = require("../../../shared/utils/assertions");

function createJornada(raw) {
  assertNonEmptyString(raw.id, "id");
  assertNonEmptyString(raw.empleado, "empleado");
  assertNonEmptyString(raw.trabajo, "trabajo");
  assertIsoDate(raw.fecha, "fecha");
  assertNonEmptyString(raw.inicio, "inicio");
  assertNonEmptyString(raw.fin, "fin");

  const [inicioHoras, inicioMinutos] = raw.inicio.split(":").map(Number);
  const [finHoras, finMinutos] = raw.fin.split(":").map(Number);

  const inicioTotalMinutos = inicioHoras * 60 + inicioMinutos;
  const finTotalMinutos = finHoras * 60 + finMinutos;

  const diferenciaMinutos = finTotalMinutos - inicioTotalMinutos;

  if (diferenciaMinutos <= 0) {
    throw new Error("La hora de fin debe ser posterior a la hora de inicio.");
  }

  const horas = diferenciaMinutos / 60;

  return {
    id: raw.id,
    empleado: raw.empleado.trim(),
    trabajo: raw.trabajo.trim(),
    fecha: raw.fecha,
    inicio: raw.inicio,
    fin: raw.fin,
    horas,
    notas: typeof raw.notas === "string" ? raw.notas.trim() : "",
  };
}

module.exports = {
  createJornada,
};
