const { TransaccionModel } = require("./persistence/transaccion.schema");
const {
  transaccionesRepository,
} = require("./repositories/transacciones.repository");
const { transaccionesService } = require("./services/transacciones.service");
const {
  TRANSACCION_ESTADOS,
  TRANSACCION_TIPOS,
} = require("./entities/transaccion.entity");

module.exports = {
  // Persistencia
  TransaccionModel,
  // Servicios
  transaccionesService,
  // Repositorio
  transaccionesRepository,
  // Constantes del dominio
  TRANSACCION_ESTADOS,
  TRANSACCION_TIPOS,
};
