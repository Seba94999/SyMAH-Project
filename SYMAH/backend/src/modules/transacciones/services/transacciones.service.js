const {
  transaccionesRepository,
} = require("../repositories/transacciones.repository");

const {
  empleadosService,
} = require("../../empleados/services/empleados.service");

function getEmpleadoAfectado(transaccion) {
  if (!transaccion) {
    return null;
  }

  if (
    transaccion.tipo === "pago" &&
    transaccion.entidadDestino === "empleado" &&
    transaccion.entidadDestinoId
  ) {
    return transaccion.entidadDestinoId;
  }

  return null;
}

class TransaccionesService {
  async getAll() {
    return transaccionesRepository.findAll();
  }

  async getById(id) {
    return transaccionesRepository.findById(id);
  }

  async getByTrabajoId(trabajoId) {
    return transaccionesRepository.findByTrabajoId(trabajoId);
  }

  async getByEmpleadoId(empleadoId) {
    return transaccionesRepository.findByEmpleadoId(empleadoId);
  }

  async create(payload) {
    // Aquí irán futuras validaciones de negocio.
    // Ej:
    // - verificar que exista el trabajo
    // - verificar que exista el empleado
    // - impedir movimientos sobre trabajos cancelados
    // - etc.

    const created = await transaccionesRepository.create(payload);
    const empleadoId = getEmpleadoAfectado(created);

    if (empleadoId) {
      await empleadosService.recalculate(empleadoId);
    }

    return created;
  }

  async update(id, patch) {
    const anterior = await transaccionesRepository.findById(id);
    const updated = await transaccionesRepository.update(id, patch);

    const empleadosARecalcular = new Set();

    const empleadoAnterior = getEmpleadoAfectado(anterior);
    const empleadoActual = getEmpleadoAfectado(updated);

    if (empleadoAnterior) {
      empleadosARecalcular.add(empleadoAnterior);
    }

    if (empleadoActual) {
      empleadosARecalcular.add(empleadoActual);
    }

    await Promise.all(
      Array.from(empleadosARecalcular).map((empleadoId) =>
        empleadosService.recalculate(empleadoId),
      ),
    );

    return updated;
  }

  async delete(id) {
    const anterior = await transaccionesRepository.findById(id);
    const deleted = await transaccionesRepository.delete(id);

    const empleadoId = getEmpleadoAfectado(anterior);

    if (empleadoId) {
      await empleadosService.recalculate(empleadoId);
    }

    return deleted;
  }
}

module.exports = {
  transaccionesService: new TransaccionesService(),
};
