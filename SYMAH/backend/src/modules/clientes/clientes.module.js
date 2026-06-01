const { clientesRepository } = require("./repositories/clientes.repository");
const { CLIENTE_ESTADOS } = require("./entities/cliente.entity");

module.exports = {
  clientesRepository,
  CLIENTE_ESTADOS,
};
