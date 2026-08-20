const {
  presupuestosRepository,
} = require("../repositories/presupuestos.repository");

class PresupuestosService {
  async getAll() {
    return presupuestosRepository.findAll();
  }

  async getById(id) {
    return presupuestosRepository.findById(id);
  }

  async create(payload) {
    return presupuestosRepository.create(payload);
  }

  async update(id, patch) {
    return presupuestosRepository.update(id, patch);
  }

  async delete(id) {
    return presupuestosRepository.delete(id);
  }
}

module.exports = {
  presupuestosService: new PresupuestosService(),
};
