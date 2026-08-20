const { presupuestosService } = require("./services/presupuestos.service");

const { PRESUPUESTO_ESTADOS } = require("./entities/presupuesto.entity");

module.exports = {
  presupuestosService,
  PRESUPUESTO_ESTADOS,
};
