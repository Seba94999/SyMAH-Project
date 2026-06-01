import { formatCurrency } from "../utils/formatters.js";
import { apiDelete, apiGet, apiPatch, apiPost } from "./apiClient.js";

const EMPLEADOS_STATUS = {
  activo: "Activo",
  inactivo: "Inactivo",
};

export function getEmpleadosBase() {
  return apiGet("/empleados");
}

export function getEmpleadoById(empleadoId) {
  return apiGet(`/empleados/${empleadoId}`);
}

export function getEmpleadosResumen(empleados = []) {
  const activos = empleados.filter(
    (empleado) => empleado.estado === "activo",
  ).length;
  const inactivos = empleados.filter(
    (empleado) => empleado.estado === "inactivo",
  ).length;
  const nominaTotal = empleados.reduce(
    (total, empleado) => total + empleado.salario,
    0,
  );

  return {
    total: empleados.length,
    activos,
    inactivos,
    nominaTotal,
  };
}

export function filtrarEmpleados(
  empleados,
  { busqueda = "", filtroEstado = "todos" } = {},
) {
  const termino = busqueda.trim().toLowerCase();

  return empleados.filter((empleado) => {
    const coincideEstado =
      filtroEstado === "todos" || empleado.estado === filtroEstado;
    const coincideBusqueda =
      termino.length === 0 ||
      empleado.nombre.toLowerCase().includes(termino) ||
      empleado.id.toLowerCase().includes(termino) ||
      empleado.cargo.toLowerCase().includes(termino) ||
      empleado.sede.toLowerCase().includes(termino);

    return coincideEstado && coincideBusqueda;
  });
}

export function obtenerVarianteEmpleadoEstado(estado) {
  return estado === "activo" ? "success" : "danger";
}

export function createEmpleado(empleado) {
  return apiPost("/empleados", empleado);
}

export function updateEmpleado(empleadoId, patch) {
  return apiPatch(`/empleados/${empleadoId}`, patch);
}

export async function deleteEmpleado(empleadoId) {
  await apiDelete(`/empleados/${empleadoId}`);
  return true;
}

export { EMPLEADOS_STATUS, formatCurrency };
