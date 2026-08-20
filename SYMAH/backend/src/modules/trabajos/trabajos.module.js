const { TrabajoModel } = require("./persistence/trabajo.schema");
const { trabajosRepository } = require("./repositories/trabajos.repository");
const { trabajosService } = require("./services/trabajos.service");
const {
  TRABAJO_ESTADOS,
  TRABAJO_PRIORIDADES,
} = require("./entities/trabajo.entity");

module.exports = {
  // Persistencia
  TrabajoModel,

  // Repositorio
  trabajosRepository,

  // Servicio
  trabajosService,

  // Constantes del dominio
  TRABAJO_ESTADOS,
  TRABAJO_PRIORIDADES,
};
