const clientes = require("./clientes/clientes.module");
const empleados = require("./empleados/empleados.module");
const trabajos = require("./trabajos/trabajos.module");
const presupuestos = require("./presupuestos/presupuestos.module");
const finanzas = require("./finanzas/finanzas.module");
const transacciones = require("./transacciones/transacciones.module");
const jornadas = require("./jornadas/jornadas.module");

module.exports = {
  clientes,
  empleados,
  trabajos,
  presupuestos,
  finanzas,
  transacciones,
  jornadas,
};
