const { empleadosRepository } = require("../repositories/empleados.repository");

const {
  jornadasRepository,
} = require("../../jornadas/repositories/jornadas.repository");

const {
  transaccionesRepository,
} = require("../../transacciones/repositories/transacciones.repository");

class EmpleadosService {
  async getAll() {
    const empleados = await empleadosRepository.findAll();

    return Promise.all(empleados.map((empleado) => this.enrich(empleado)));
  }

  async getById(codigo) {
    const empleado = await empleadosRepository.findById(codigo);

    if (!empleado) {
      return null;
    }

    return this.enrich(empleado);
  }

  async create(payload) {
    const empleado = await empleadosRepository.create(payload);
    const recalculado = await this.recalculate(empleado.id);

    return this.enrich(recalculado);
  }

  async update(codigo, patch) {
    const empleado = await empleadosRepository.update(codigo, patch);

    if (!empleado) {
      return null;
    }

    const recalculado = await this.recalculate(codigo);

    return this.enrich(recalculado);
  }

  async delete(codigo) {
    return empleadosRepository.delete(codigo);
  }

  async getJornadas(codigo) {
    return jornadasRepository.findByEmpleado(codigo);
  }

  async getTransacciones(codigo) {
    return transaccionesRepository.findByEmpleadoId(codigo);
  }

  async buildFinancialState(codigo, empleado = null) {
    const baseEmpleado =
      empleado || (await empleadosRepository.findById(codigo));

    if (!baseEmpleado) {
      return null;
    }

    const jornadas = await this.getJornadas(codigo);
    const transacciones = await this.getTransacciones(codigo);

    const horasMes = jornadas.reduce(
      (total, jornada) => total + Number(jornada.horas || 0),
      0,
    );

    const totalDevengado = horasMes * Number(baseEmpleado.tarifaPorHora || 0);
    const pagado = transacciones
      .filter((transaccion) => transaccion.tipo === "pago")
      .reduce(
        (total, transaccion) => total + Number(transaccion.monto || 0),
        0,
      );
    const saldo = Math.max(totalDevengado - pagado, 0);

    return {
      ...baseEmpleado,
      jornadas,
      transacciones,
      horasMes,
      pagado,
      saldo,
    };
  }

  async recalculate(codigo) {
    const financialState = await this.buildFinancialState(codigo);

    if (!financialState) {
      return null;
    }

    return empleadosRepository.update(codigo, {
      horasMes: financialState.horasMes,
      saldo: financialState.saldo,
      pagado: financialState.pagado,
    });
  }

  async enrich(empleado) {
    const financialState = await this.buildFinancialState(
      empleado.id,
      empleado,
    );

    return financialState || empleado;
  }
}

module.exports = {
  empleadosService: new EmpleadosService(),
};
