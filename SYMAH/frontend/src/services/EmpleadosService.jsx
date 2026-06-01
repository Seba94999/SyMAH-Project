import { formatCurrency } from "../utils/formatters.js";

const EMPLEADOS_STATUS = {
  activo: "Activo",
  inactivo: "Inactivo",
};

let EMPLEADOS_BASE = [
  {
    id: "EMP-001",
    nombre: "Ana Torres",
    cargo: "Supervisor de obra",
    sede: "Santiago",
    estado: "activo",
    jornada: "Completa",
    salario: 1350000,
    horasMes: 168,
    ultimaActividad: "Turno de inspección",
  },
  {
    id: "EMP-002",
    nombre: "Marco Fuentes",
    cargo: "Técnico de mantención",
    sede: "Concepción",
    estado: "activo",
    jornada: "Completa",
    salario: 1120000,
    horasMes: 160,
    ultimaActividad: "Revisión de equipos",
  },
  {
    id: "EMP-003",
    nombre: "Claudia Rivas",
    cargo: "Administrativa",
    sede: "Valparaíso",
    estado: "inactivo",
    jornada: "Parcial",
    salario: 780000,
    horasMes: 96,
    ultimaActividad: "Cierre documental",
  },
  {
    id: "EMP-004",
    nombre: "Pedro Silva",
    cargo: "Asistente operativo",
    sede: "La Serena",
    estado: "activo",
    jornada: "Completa",
    salario: 980000,
    horasMes: 152,
    ultimaActividad: "Apoyo en bodega",
  },
  {
    id: "EMP-005",
    nombre: "Carla Medina",
    cargo: "Jefa de terreno",
    sede: "Temuco",
    estado: "activo",
    jornada: "Completa",
    salario: 1450000,
    horasMes: 172,
    ultimaActividad: "Planificación semanal",
  },
];

export function getEmpleadosBase() {
  return EMPLEADOS_BASE;
}

export function getEmpleadoById(empleadoId) {
  return EMPLEADOS_BASE.find((empleado) => empleado.id === empleadoId) || null;
}

export function getEmpleadosResumen(empleados = EMPLEADOS_BASE) {
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

function generarEmpleadoId() {
  const lastEmpleado = EMPLEADOS_BASE[EMPLEADOS_BASE.length - 1];
  const nextNumber = lastEmpleado
    ? Number(lastEmpleado.id.split("-")[1]) + 1
    : 1;
  return `EMP-${String(nextNumber).padStart(3, "0")}`;
}

export function createEmpleado(empleado) {
  const nuevoEmpleado = {
    ...empleado,
    id: generarEmpleadoId(),
  };

  EMPLEADOS_BASE = [...EMPLEADOS_BASE, nuevoEmpleado];
  return nuevoEmpleado;
}

export function updateEmpleado(empleadoId, patch) {
  let updatedEmpleado = null;

  EMPLEADOS_BASE = EMPLEADOS_BASE.map((empleado) => {
    if (empleado.id !== empleadoId) {
      return empleado;
    }

    updatedEmpleado = { ...empleado, ...patch, id: empleado.id };
    return updatedEmpleado;
  });

  return updatedEmpleado;
}

export function deleteEmpleado(empleadoId) {
  const exists = EMPLEADOS_BASE.some((empleado) => empleado.id === empleadoId);
  EMPLEADOS_BASE = EMPLEADOS_BASE.filter(
    (empleado) => empleado.id !== empleadoId,
  );
  return exists;
}

export { EMPLEADOS_STATUS, formatCurrency };
