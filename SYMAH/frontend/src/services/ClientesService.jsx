import { apiDelete, apiGet, apiPatch, apiPost } from "./apiClient.js";

const CLIENT_STATUS = {
  activo: "Activo",
  enRiesgo: "En riesgo",
  inactivo: "Inactivo",
};

export function getClientesBase() {
  return apiGet("/clientes");
}

export function getClientesResumen(clientes = []) {
  const activos = clientes.filter(
    (cliente) => cliente.estado === "activo",
  ).length;
  const enRiesgo = clientes.filter(
    (cliente) => cliente.estado === "enRiesgo",
  ).length;
  const saldoTotal = clientes.reduce(
    (acumulado, cliente) => acumulado + cliente.balancePendiente,
    0,
  );

  return {
    total: clientes.length,
    activos,
    enRiesgo,
    saldoTotal,
  };
}

export function filtrarClientes(
  clientes,
  { busqueda = "", filtroEstado = "todos" } = {},
) {
  const termino = busqueda.trim().toLowerCase();

  return clientes.filter((cliente) => {
    const coincideEstado =
      filtroEstado === "todos" || cliente.estado === filtroEstado;
    const coincideBusqueda =
      termino.length === 0 ||
      cliente.nombre.toLowerCase().includes(termino) ||
      cliente.id.toLowerCase().includes(termino) ||
      cliente.ciudad.toLowerCase().includes(termino) ||
      cliente.contacto.toLowerCase().includes(termino);

    return coincideEstado && coincideBusqueda;
  });
}

export function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(valor);
}

export function obtenerClaseEstado(estado) {
  if (estado === "activo") {
    return "clientes-badge--activo";
  }

  if (estado === "enRiesgo") {
    return "clientes-badge--riesgo";
  }

  return "clientes-badge--inactivo";
}

export function createCliente(cliente) {
  return apiPost("/clientes", cliente);
}

export function updateCliente(clienteId, patch) {
  return apiPatch(`/clientes/${clienteId}`, patch);
}

export async function deleteCliente(clienteId) {
  await apiDelete(`/clientes/${clienteId}`);
  return true;
}

export { CLIENT_STATUS };
