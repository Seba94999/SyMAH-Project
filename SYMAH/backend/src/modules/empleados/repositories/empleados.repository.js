const {
  createInMemoryCollection,
} = require("../../../shared/database/in-memory-store");
const { createEmpleado } = require("../entities/empleado.entity");

const empleadosStore = createInMemoryCollection({
  collectionName: "empleados",
  idPrefix: "EMP",
  hydrate: createEmpleado,
  initialData: [
    {
      id: "EMP-001",
      nombre: "Ana Torres",
      cargo: "Supervisor de obra",
      sede: "Santiago",
      estado: "activo",
      jornada: "Completa",
      salario: 1350000,
      horasMes: 168,
      ultimaActividad: "Turno de inspeccion",
    },
    {
      id: "EMP-002",
      nombre: "Marco Fuentes",
      cargo: "Tecnico de mantencion",
      sede: "Concepcion",
      estado: "activo",
      jornada: "Completa",
      salario: 1120000,
      horasMes: 160,
      ultimaActividad: "Revision de equipos",
    },
  ],
});

class EmpleadosRepository {
  findAll() {
    return empleadosStore.list();
  }

  findById(empleadoId) {
    return empleadosStore.getById(empleadoId);
  }

  create(payload) {
    return empleadosStore.create(payload);
  }

  update(empleadoId, patch) {
    return empleadosStore.update(empleadoId, patch);
  }

  delete(empleadoId) {
    return empleadosStore.remove(empleadoId);
  }
}

module.exports = { empleadosRepository: new EmpleadosRepository() };
