const { finanzasRepository } = require("./repositories/finanzas.repository");
const { MOVIMIENTO_TIPOS } = require("./entities/movimiento.entity");

module.exports = {
  finanzasRepository,
  MOVIMIENTO_TIPOS,
};
