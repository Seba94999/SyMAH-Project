const { trabajosRepository } = require("./repositories/trabajos.repository");
const {
  TRABAJO_ESTADOS,
  TRABAJO_PRIORIDADES,
} = require("./entities/trabajo.entity");

module.exports = {
  trabajosRepository,
  TRABAJO_ESTADOS,
  TRABAJO_PRIORIDADES,
};
