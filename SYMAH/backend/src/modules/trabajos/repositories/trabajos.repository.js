const {
  createInMemoryCollection,
} = require("../../../shared/database/in-memory-store");
const { createTrabajo } = require("../entities/trabajo.entity");

const trabajosStore = createInMemoryCollection({
  collectionName: "trabajos",
  idPrefix: "TR",
  hydrate: createTrabajo,
  initialData: [
    {
      id: "TR-001",
      nombre: "Mantencion estructura norte",
      cliente: "Constructora Valle Azul",
      responsable: "Ana Torres",
      estado: "enCurso",
      prioridad: "Alta",
      progreso: 72,
      monto: 18500000,
      ultimaActualizacion: "2026-05-26",
    },
    {
      id: "TR-002",
      nombre: "Revision patio de carga",
      cliente: "Logistica Ruta Sur",
      responsable: "Marco Fuentes",
      estado: "enPausa",
      prioridad: "Media",
      progreso: 41,
      monto: 9200000,
      ultimaActualizacion: "2026-05-23",
    },
  ],
});

class TrabajosRepository {
  findAll() {
    return trabajosStore.list();
  }

  findById(trabajoId) {
    return trabajosStore.getById(trabajoId);
  }

  create(payload) {
    return trabajosStore.create(payload);
  }

  update(trabajoId, patch) {
    return trabajosStore.update(trabajoId, patch);
  }

  delete(trabajoId) {
    return trabajosStore.remove(trabajoId);
  }
}

module.exports = { trabajosRepository: new TrabajosRepository() };
