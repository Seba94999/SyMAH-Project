import { getTrabajosBase } from "./TrabajosService.jsx";

let JORNADAS_BASE = [
  {
    id: "JR-001",
    empleadoId: "EMP-001",
    trabajoId: "TR-001",
    fecha: "2026-05-20",
    inicio: "08:00",
    fin: "17:00",
    duracionHoras: 9,
    notas: "Inspección de estructuras",
  },
  {
    id: "JR-002",
    empleadoId: "EMP-001",
    trabajoId: "TR-005",
    fecha: "2026-05-25",
    inicio: "09:00",
    fin: "15:00",
    duracionHoras: 6,
    notas: "Revisión de línea interna",
  },
  {
    id: "JR-003",
    empleadoId: "EMP-002",
    trabajoId: "TR-002",
    fecha: "2026-05-22",
    inicio: "07:30",
    fin: "12:30",
    duracionHoras: 5,
    notas: "Mantenimiento parcial",
  },
];

function generarId() {
  const last = JORNADAS_BASE[JORNADAS_BASE.length - 1];
  const num = last ? parseInt(last.id.split("-")[1], 10) + 1 : 1;
  return `JR-${String(num).padStart(3, "0")}`;
}

export function getJornadasBase() {
  return JORNADAS_BASE;
}

export function getJornadasByEmpleado(empleadoId) {
  return JORNADAS_BASE.filter((j) => j.empleadoId === empleadoId);
}

export function getJornadasByTrabajo(trabajoId) {
  return JORNADAS_BASE.filter((j) => j.trabajoId === trabajoId);
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
  const nueva = { ...jornada, id: generarId() };
  JORNADAS_BASE = [...JORNADAS_BASE, nueva];
  return nueva;
}

export function updateJornada(id, patch) {
  JORNADAS_BASE = JORNADAS_BASE.map((j) =>
    j.id === id ? { ...j, ...patch } : j,
  );
  return JORNADAS_BASE.find((j) => j.id === id) || null;
}

export function deleteJornada(id) {
  const exists = JORNADAS_BASE.some((j) => j.id === id);
  JORNADAS_BASE = JORNADAS_BASE.filter((j) => j.id !== id);
  return exists;
}

export function listarTrabajosParaSelect() {
  return getTrabajosBase().map((t) => ({
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
