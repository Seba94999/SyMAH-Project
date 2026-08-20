const { jornadasRepository } = require("../repositories/jornadas.repository");

const {
  empleadosService,
} = require("../../empleados/services/empleados.service");

const { trabajosService } = require("../../trabajos/services/trabajos.service");

class JornadasService {
  async getAll() {
    return jornadasRepository.findAll();
  }

  async getById(id) {
    return jornadasRepository.findById(id);
  }

  async getByEmpleado(empleado) {
    return jornadasRepository.findByEmpleado(empleado);
  }

  async getByTrabajo(trabajo) {
    return jornadasRepository.findByTrabajo(trabajo);
  }

  async create(payload) {
    const jornada = await jornadasRepository.create(payload);

    await empleadosService.recalculate(jornada.empleado);
    await trabajosService.recalculate(jornada.trabajo);

    return jornada;
  }

  async update(id, patch) {
    const anterior = await jornadasRepository.findById(id);

    if (!anterior) {
      return null;
    }

    const jornada = await jornadasRepository.update(id, patch);

    await empleadosService.recalculate(anterior.empleado);

    if (anterior.trabajo !== jornada.trabajo) {
      await trabajosService.recalculate(anterior.trabajo);
    }

    if (anterior.empleado !== jornada.empleado) {
      await empleadosService.recalculate(jornada.empleado);
    }

    await trabajosService.recalculate(jornada.trabajo);

    return jornada;
  }

  async delete(id) {
    const jornada = await jornadasRepository.findById(id);

    if (!jornada) {
      return false;
    }

    await jornadasRepository.delete(id);

    await empleadosService.recalculate(jornada.empleado);
    await trabajosService.recalculate(jornada.trabajo);

    return true;
  }
}

module.exports = {
  jornadasService: new JornadasService(),
};
