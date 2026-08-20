import { apiDelete, apiGet, apiPatch, apiPost } from "./apiClient.js";

function normalizarJornada(jornada) {
  if (!jornada) {
    return jornada;
  }

  const trabajoId =
    jornada.trabajoId ||
    jornada.trabajo?.id ||
    jornada.trabajo?.codigo ||
    jornada.trabajo?._id ||
    jornada.trabajo ||
    "";

  const duracionHoras = jornada.duracionHoras ?? jornada.horas ?? 0;

  return {
    ...jornada,
    trabajoId,
    duracionHoras,
    horas: jornada.horas ?? duracionHoras,
  };
}

export function getJornadasBase() {
  return apiGet("/jornadas").then((jornadas) =>
    jornadas.map(normalizarJornada),
  );
}

export function getJornadasByEmpleado(empleadoId) {
  return apiGet(`/jornadas?empleado=${encodeURIComponent(empleadoId)}`).then(
    (jornadas) => jornadas.map(normalizarJornada),
  );
}

export function getJornadasByTrabajo(trabajoId) {
  return apiGet(`/jornadas?trabajo=${encodeURIComponent(trabajoId)}`).then(
    (jornadas) => jornadas.map(normalizarJornada),
  );
}

export function filtrarJornadasPorMesYAnio(
  jornadas,
  { mes = "todos", anio = "todos" } = {},
) {
  return jornadas.filter((jornada) => {
    const fecha = new Date(`${jornada.fecha}T00:00:00`);
    const coincideMes = mes === "todos" || String(fecha.getMonth() + 1) === mes;
    const coincideAnio =
      anio === "todos" || String(fecha.getFullYear()) === anio;

    return coincideMes && coincideAnio;
  });
}

export function createJornada(jornada) {
  const payload = {
    ...jornada,
    empleadoId: jornada.empleadoId || jornada.empleado,
    trabajoId: jornada.trabajoId || jornada.trabajo,
  };

  return apiPost("/jornadas", payload).then(normalizarJornada);
}

export function updateJornada(id, patch) {
  return apiPatch(`/jornadas/${id}`, patch).then(normalizarJornada);
}

export async function deleteJornada(id) {
  await apiDelete(`/jornadas/${id}`);
  return true;
}

export async function listarTrabajosParaSelect() {
  const trabajos = await apiGet("/trabajos");
  return trabajos.map((t) => ({
    value: t.id,
    label: `${t.id} — ${t.nombre}`,
  }));
}

export default {
  getJornadasBase,
  getJornadasByEmpleado,
  getJornadasByTrabajo,
  filtrarJornadasPorMesYAnio,
  createJornada,
  updateJornada,
  deleteJornada,
  listarTrabajosParaSelect,
};
