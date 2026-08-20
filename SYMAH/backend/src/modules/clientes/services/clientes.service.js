const { clientesRepository } = require("../repositories/clientes.repository");

const {
  trabajosRepository,
} = require("../../trabajos/repositories/trabajos.repository");

class ClientesService {
  async getAll() {
    console.log("Entró a ClientesService.getAll");
    const clientes = await clientesRepository.findAll();

    return Promise.all(clientes.map((cliente) => this.enrich(cliente)));
  }

  async getById(codigo) {
    const cliente = await clientesRepository.findById(codigo);

    if (!cliente) {
      return null;
    }

    return this.enrich(cliente);
  }

  async create(payload) {
    const cliente = await clientesRepository.create(payload);

    return this.enrich(cliente);
  }

  async update(codigo, patch) {
    // Nunca permitimos modificar el balance manualmente
    const { balancePendiente, ...data } = patch;

    const cliente = await clientesRepository.update(codigo, data);

    if (!cliente) {
      return null;
    }

    return this.enrich(cliente);
  }

  async delete(codigo) {
    return clientesRepository.delete(codigo);
  }

  async getTrabajos(codigo) {
    return trabajosRepository.findByCliente(codigo);
  }

  async recalculate(codigo) {
    const cliente = await clientesRepository.findById(codigo);

    if (!cliente) {
      return null;
    }

    return this.enrich(cliente);
  }

  async enrich(cliente) {
    const trabajos = await this.getTrabajos(cliente.id);

    const balancePendiente = trabajos.reduce(
      (total, trabajo) => total + Number(trabajo.saldoPorCobrar || 0),
      0,
    );

    const ultimoTrabajo =
      trabajos.length === 0
        ? ""
        : trabajos.reduce((ultimo, actual) => {
            if (!ultimo) {
              return actual;
            }

            return new Date(actual.fechaInicio) > new Date(ultimo.fechaInicio)
              ? actual
              : ultimo;
          }, null);

    return {
      ...cliente,
      trabajos,
      ultimoTrabajo: ultimoTrabajo.id ?? "",
      balancePendiente,
    };
  }
}

module.exports = {
  clientesService: new ClientesService(),
};
