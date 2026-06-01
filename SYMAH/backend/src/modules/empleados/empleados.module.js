const { empleadosRepository } = require("./repositories/empleados.repository");
const {
  EMPLEADO_ESTADOS,
  JORNADAS_VALIDAS,
} = require("./entities/empleado.entity");

module.exports = {
  empleadosRepository,
  EMPLEADO_ESTADOS,
  JORNADAS_VALIDAS,
};
