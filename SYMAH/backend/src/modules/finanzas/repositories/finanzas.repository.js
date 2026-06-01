const {
  createInMemoryCollection,
} = require("../../../shared/database/in-memory-store");
const { createMovimiento } = require("../entities/movimiento.entity");

const finanzasStore = createInMemoryCollection({
  collectionName: "finanzas",
  idPrefix: "FN",
  hydrate: createMovimiento,
  initialData: [
    {
      id: "FN-001",
      tipo: "ingreso",
      concepto: "Cobro proyecto estructura norte",
      referencia: "TR-001",
      fecha: "2026-05-26",
      monto: 5200000,
    },
    {
      id: "FN-002",
      tipo: "gasto",
      concepto: "Compra de materiales",
      referencia: "OT-118",
      fecha: "2026-05-25",
      monto: 1350000,
    },
  ],
});

class FinanzasRepository {
  findAll() {
    return finanzasStore.list();
  }

  findById(movimientoId) {
    return finanzasStore.getById(movimientoId);
  }

  create(payload) {
    return finanzasStore.create(payload);
  }

  update(movimientoId, patch) {
    return finanzasStore.update(movimientoId, patch);
  }

  delete(movimientoId) {
    return finanzasStore.remove(movimientoId);
  }
}

module.exports = { finanzasRepository: new FinanzasRepository() };
