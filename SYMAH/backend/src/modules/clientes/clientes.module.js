const { ClienteModel } = require("./persistence/cliente.schema");
const { clientesRepository } = require("./repositories/clientes.repository");
const { clientesService } = require("./services/clientes.service");
const { CLIENTE_ESTADOS } = require("./entities/cliente.entity");

module.exports = {
  // Persistencia
  ClienteModel,

  // Repositorio
  clientesRepository,

  // Servicio
  clientesService,

  // Constantes del dominio
  CLIENTE_ESTADOS,
};
