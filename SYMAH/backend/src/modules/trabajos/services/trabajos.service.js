const { trabajosRepository } = require("../repositories/trabajos.repository");

const {
  jornadasRepository,
} = require("../../jornadas/repositories/jornadas.repository");

const {
  empleadosService,
} = require("../../empleados/services/empleados.service");

const {
  transaccionesService,
} = require("../../transacciones/services/transacciones.service");

const { createTrabajo } = require("../entities/trabajo.entity");

function generateTrabajoId() {
  return `TRAB-${Date.now()}`;
}

class TrabajosService {
  async getAll() {
    const trabajos = await trabajosRepository.findAll();

    return Promise.all(trabajos.map((trabajo) => this.enrich(trabajo)));
  }

  async getById(codigo) {
    const trabajo = await trabajosRepository.findById(codigo);

    if (!trabajo) {
      return null;
    }

    return this.enrich(trabajo);
  }

  async create(payload) {
    console.log("PAYLOAD RECIBIDO EN SERVICE:", payload);

    const trabajo = createTrabajo({
      ...payload,
      id: generateTrabajoId(),
    });
    console.log("TRABAJO DE DOMINIO:", trabajo);

    const trabajoCreado = await trabajosRepository.create(trabajo);

    return this.enrich(trabajoCreado);
  }

  async update(codigo, patch) {
    const trabajo = await trabajosRepository.update(codigo, patch);

    if (!trabajo) {
      return null;
    }

    return this.enrich(trabajo);
  }

  async delete(codigo) {
    return trabajosRepository.delete(codigo);
  }

  async getJornadas(codigo) {
    return jornadasRepository.findByTrabajo(codigo);
  }

  async recalculate(codigo) {
    const trabajo = await trabajosRepository.findById(codigo);

    if (!trabajo) {
      return null;
    }

    const enriched = await this.enrich(trabajo);

    return trabajosRepository.update(codigo, {
      gastoManoObra: enriched.gastoManoObra,
      cobrado: enriched.cobrado,
      saldoPorCobrar: enriched.saldoPorCobrar,
    });
  }

  async getTransacciones(codigo) {
    return transaccionesService.getByTrabajoId(codigo);
  }

  async enrich(trabajo) {
    const jornadas = await this.getJornadas(trabajo.id);

    const transacciones = await this.getTransacciones(trabajo.id);

    let gastoManoObra = 0;

    for (const jornada of jornadas) {
      const empleado = await empleadosService.getById(jornada.empleado);

      if (!empleado) {
        continue;
      }

      gastoManoObra +=
        Number(jornada.horas || 0) * Number(empleado.tarifaPorHora || 0);
    }

    const cobrado = transacciones
      .filter((t) => t.tipo === "cobro")
      .reduce(
        (total, transaccion) => total + Number(transaccion.monto || 0),
        0,
      );

    const saldoPorCobrar = Math.max(Number(trabajo.monto || 0) - cobrado, 0);

    return {
      ...trabajo,
      jornadas,
      transacciones,
      gastoManoObra,
      cobrado,
      saldoPorCobrar,
    };
  }
}

module.exports = {
  trabajosService: new TrabajosService(),
};
