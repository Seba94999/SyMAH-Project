import { formatCurrency } from "../utils/formatters.js";

export const FINANZAS_TIPOS = {
  ingreso: "Ingreso",
  cobro: "Cobro",
  gasto: "Gasto",
  pago: "Pago",
};

const FINANZAS_MOVIMIENTOS = [
  {
    id: "FN-001",
    tipo: "ingreso",
    concepto: "Cobro proyecto estructura norte",
    referencia: "TR-001",
    fecha: "2026-05-26",
    monto: 5200000,
  },
  {
    id: "FN-002",
    tipo: "gasto",
    concepto: "Compra de materiales",
    referencia: "OT-118",
    fecha: "2026-05-25",
    monto: 1350000,
  },
  {
    id: "FN-003",
    tipo: "pago",
    concepto: "Pago técnico de mantención",
    referencia: "EMP-002",
    fecha: "2026-05-24",
    monto: 1120000,
  },
  {
    id: "FN-004",
    tipo: "cobro",
    concepto: "Anticipo obra clínica",
    referencia: "TR-003",
    fecha: "2026-05-23",
    monto: 2400000,
  },
  {
    id: "FN-005",
    tipo: "gasto",
    concepto: "Viáticos operativos",
    referencia: "OP-044",
    fecha: "2026-05-22",
    monto: 320000,
  },
];

export function getFinanzasMovimientos() {
  return FINANZAS_MOVIMIENTOS;
}

function generarMovimientoId() {
  const last = FINANZAS_MOVIMIENTOS[FINANZAS_MOVIMIENTOS.length - 1];
  const nextNumber = last ? Number(last.id.split("-")[1]) + 1 : 1;
  return `FN-${String(nextNumber).padStart(3, "0")}`;
}

export function getFinanzasResumen(movimientos = FINANZAS_MOVIMIENTOS) {
  const ingresos = movimientos
    .filter((item) => item.tipo === "ingreso" || item.tipo === "cobro")
    .reduce((total, item) => total + item.monto, 0);
  const gastos = movimientos
    .filter((item) => item.tipo === "gasto" || item.tipo === "pago")
    .reduce((total, item) => total + item.monto, 0);
  const neto = ingresos - gastos;

  return {
    totalMovimientos: movimientos.length,
    ingresos,
    gastos,
    neto,
  };
}

export function filtrarMovimientos(
  movimientos,
  { busqueda = "", filtroTipo = "todos" } = {},
) {
  const termino = busqueda.trim().toLowerCase();

  return movimientos.filter((movimiento) => {
    const coincideTipo =
      filtroTipo === "todos" || movimiento.tipo === filtroTipo;
    const coincideBusqueda =
      termino.length === 0 ||
      movimiento.concepto.toLowerCase().includes(termino) ||
      movimiento.id.toLowerCase().includes(termino) ||
      movimiento.referencia.toLowerCase().includes(termino);

    return coincideTipo && coincideBusqueda;
  });
}

export function obtenerVarianteMovimientoTipo(tipo) {
  if (tipo === "ingreso" || tipo === "cobro") return "success";
  if (tipo === "gasto") return "danger";
  return "primary";
}

export function createMovimiento(movimiento) {
  const nuevoMovimiento = {
    ...movimiento,
    id: generarMovimientoId(),
  };

  FINANZAS_MOVIMIENTOS.push(nuevoMovimiento);
  return nuevoMovimiento;
}

export function updateMovimiento(movimientoId, patch) {
  let updatedMovimiento = null;

  for (let index = 0; index < FINANZAS_MOVIMIENTOS.length; index += 1) {
    const movimiento = FINANZAS_MOVIMIENTOS[index];

    if (movimiento.id !== movimientoId) {
      continue;
    }

    updatedMovimiento = { ...movimiento, ...patch, id: movimiento.id };
    FINANZAS_MOVIMIENTOS[index] = updatedMovimiento;
    break;
  }

  return updatedMovimiento;
}

export function deleteMovimiento(movimientoId) {
  const index = FINANZAS_MOVIMIENTOS.findIndex(
    (movimiento) => movimiento.id === movimientoId,
  );

  if (index === -1) {
    return false;
  }

  FINANZAS_MOVIMIENTOS.splice(index, 1);
  return true;
}

export { formatCurrency };
