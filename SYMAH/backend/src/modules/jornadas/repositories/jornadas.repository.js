const {
  createInMemoryCollection,
} = require("../../../shared/database/in-memory-store");
const { createJornada } = require("../entities/jornada.entity");

const jornadasStore = createInMemoryCollection({
  collectionName: "jornadas",
  idPrefix: "JR",
  hydrate: createJornada,
  initialData: [
    {
      id: "JR-001",
      empleadoId: "EMP-001",
      trabajoId: "TR-001",
      fecha: "2026-05-20",
      inicio: "08:00",
      fin: "17:00",
      duracionHoras: 9,
      notas: "Inspeccion de estructuras",
    },
    {
      id: "JR-002",
      empleadoId: "EMP-002",
      trabajoId: "TR-002",
      fecha: "2026-05-22",
      inicio: "07:30",
      fin: "12:30",
      duracionHoras: 5,
      notas: "Mantenimiento parcial",
    },
  ],
});

class JornadasRepository {
  findAll() {
    return jornadasStore.list();
  }

  findById(jornadaId) {
    return jornadasStore.getById(jornadaId);
  }

  findByEmpleadoId(empleadoId) {
    return jornadasStore
      .list()
      .filter((jornada) => jornada.empleadoId === empleadoId);
  }

  findByTrabajoId(trabajoId) {
    return jornadasStore
      .list()
      .filter((jornada) => jornada.trabajoId === trabajoId);
  }

  create(payload) {
    return jornadasStore.create(payload);
  }

  update(jornadaId, patch) {
    return jornadasStore.update(jornadaId, patch);
  }

  delete(jornadaId) {
    return jornadasStore.remove(jornadaId);
  }
}

module.exports = { jornadasRepository: new JornadasRepository() };
