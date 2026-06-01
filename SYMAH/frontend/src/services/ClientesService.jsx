const CLIENT_STATUS = {
  activo: "Activo",
  enRiesgo: "En riesgo",
  inactivo: "Inactivo",
};

let CLIENTES_BASE = [
  {
    id: "CL-001",
    nombre: "Constructora Valle Azul",
    rubro: "Construccion",
    ciudad: "Santiago",
    estado: "activo",
    contacto: "Mariana Soto",
    correo: "mariana.soto@valleazul.cl",
    telefono: "+56 9 4567 8890",
    ultimoTrabajo: "Mantencion de estructura norte",
    balancePendiente: 1850000,
  },
  {
    id: "CL-002",
    nombre: "Logistica Ruta Sur",
    rubro: "Logistica",
    ciudad: "Concepcion",
    estado: "enRiesgo",
    contacto: "Luis Barrera",
    correo: "lbarrera@rutasur.cl",
    telefono: "+56 9 3344 9900",
    ultimoTrabajo: "Revision de patio de carga",
    balancePendiente: 3290000,
  },
  {
    id: "CL-003",
    nombre: "Clinica San Gabriel",
    rubro: "Salud",
    ciudad: "Valparaiso",
    estado: "activo",
    contacto: "Daniela Rojas",
    correo: "daniela.rojas@csangabriel.cl",
    telefono: "+56 9 7766 2211",
    ultimoTrabajo: "Acondicionamiento de pabellon B",
    balancePendiente: 740000,
  },
  {
    id: "CL-004",
    nombre: "Mercados del Pacífico",
    rubro: "Retail",
    ciudad: "La Serena",
    estado: "inactivo",
    contacto: "Fernando Guerra",
    correo: "fernando.guerra@mdp.cl",
    telefono: "+56 9 2288 7711",
    ultimoTrabajo: "Remodelacion de sala de ventas",
    balancePendiente: 0,
  },
  {
    id: "CL-005",
    nombre: "Energia Nova",
    rubro: "Energia",
    ciudad: "Temuco",
    estado: "activo",
    contacto: "Carolina Mella",
    correo: "cmella@energianova.cl",
    telefono: "+56 9 1122 3344",
    ultimoTrabajo: "Inspeccion de lineas internas",
    balancePendiente: 990000,
  },
];

export function getClientesBase() {
  return CLIENTES_BASE;
}

function generarClienteId() {
  const last = CLIENTES_BASE[CLIENTES_BASE.length - 1];
  const nextNumber = last ? Number(last.id.split("-")[1]) + 1 : 1;
  return `CL-${String(nextNumber).padStart(3, "0")}`;
}

export function getClientesResumen(clientes = CLIENTES_BASE) {
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
  const nuevoCliente = {
    ...cliente,
    id: generarClienteId(),
  };

  CLIENTES_BASE = [...CLIENTES_BASE, nuevoCliente];
  return nuevoCliente;
}

export function updateCliente(clienteId, patch) {
  let updatedCliente = null;

  CLIENTES_BASE = CLIENTES_BASE.map((cliente) => {
    if (cliente.id !== clienteId) {
      return cliente;
    }

    updatedCliente = { ...cliente, ...patch, id: cliente.id };
    return updatedCliente;
  });

  return updatedCliente;
}

export function deleteCliente(clienteId) {
  const exists = CLIENTES_BASE.some((cliente) => cliente.id === clienteId);
  CLIENTES_BASE = CLIENTES_BASE.filter((cliente) => cliente.id !== clienteId);
  return exists;
}

export { CLIENT_STATUS };
