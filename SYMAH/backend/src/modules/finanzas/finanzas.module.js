const { finanzasService } = require("./services/finanzas.service");

const {
  TRANSACCION_TIPOS,
  TRANSACCION_ESTADOS,
} = require("../transacciones/entities/transaccion.entity");

module.exports = {
  finanzasService,
  MOVIMIENTO_TIPOS: TRANSACCION_TIPOS,
  TRANSACCION_TIPOS,
  TRANSACCION_ESTADOS,
};
