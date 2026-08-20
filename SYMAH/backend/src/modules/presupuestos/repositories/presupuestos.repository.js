const {
  createInMemoryCollection,
} = require("../../../shared/database/in-memory-store");
const { createPresupuesto } = require("../entities/presupuesto.entity");

const presupuestosStore = createInMemoryCollection({
  collectionName: "presupuestos",
  idPrefix: "PR",
  hydrate: createPresupuesto,
  initialData: [
    {
      id: "PR-001",
      cliente: "Constructora Valle Azul",
      descripcion: "Mantenimiento preventivo de estructura",
      estado: "aprobado",
      fecha: "2026-05-22",
      monto: 18500000,
      clienteRegistrado: true,
      trabajoVinculado: "TR-001",
    },
    {
      id: "PR-002",
      cliente: "Logistica Ruta Sur",
      descripcion: "Revision de patio y areas de carga",
      estado: "pendiente",
      fecha: "2026-05-24",
      monto: 9200000,
      clienteRegistrado: true,
      trabajoVinculado: null,
    },
  ],
});

class PresupuestosRepository {
  findAll() {
    return presupuestosStore.list();
  }

  findById(presupuestoId) {
    return presupuestosStore.getById(presupuestoId);
  }

  create(payload) {
    return presupuestosStore.create(payload);
  }

  update(presupuestoId, patch) {
    return presupuestosStore.update(presupuestoId, patch);
  }

  delete(presupuestoId) {
    return presupuestosStore.remove(presupuestoId);
  }
}

module.exports = { presupuestosRepository: new PresupuestosRepository() };
