const {
  presupuestosRepository,
} = require("./repositories/presupuestos.repository");
const { PRESUPUESTO_ESTADOS } = require("./entities/presupuesto.entity");

module.exports = {
  presupuestosRepository,
  PRESUPUESTO_ESTADOS,
};
