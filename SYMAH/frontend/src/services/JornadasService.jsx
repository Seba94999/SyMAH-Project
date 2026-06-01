import { apiDelete, apiGet, apiPatch, apiPost } from "./apiClient.js";

export function getJornadasBase() {
  return apiGet("/jornadas");
}

export function getJornadasByEmpleado(empleadoId) {
  return apiGet(`/jornadas?empleadoId=${encodeURIComponent(empleadoId)}`);
}

export function getJornadasByTrabajo(trabajoId) {
  return apiGet(`/jornadas?trabajoId=${encodeURIComponent(trabajoId)}`);
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
  return apiPost("/jornadas", jornada);
}

export function updateJornada(id, patch) {
  return apiPatch(`/jornadas/${id}`, patch);
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
