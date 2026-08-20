const { EmpleadoModel } = require("./persistence/empleado.schema");
const { empleadosRepository } = require("./repositories/empleados.repository");
const { empleadosService } = require("./services/empleados.service");

const {
  EMPLEADO_ESTADOS,
  JORNADAS_VALIDAS,
} = require("./entities/empleado.entity");

module.exports = {
  // Persistencia
  EmpleadoModel,

  // Repositorio
  empleadosRepository,

  // Servicio
  empleadosService,

  // Constantes del dominio
  EMPLEADO_ESTADOS,
  JORNADAS_VALIDAS,
};
