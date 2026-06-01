const {
  createInMemoryCollection,
} = require("../../../shared/database/in-memory-store");
const { createCliente } = require("../entities/cliente.entity");

const clientesStore = createInMemoryCollection({
  collectionName: "clientes",
  idPrefix: "CL",
  hydrate: createCliente,
  initialData: [
    {
      id: "CL-001",
      nombre: "Constructora Valle Azul",
      rubro: "Construccion",
      ciudad: "Santiago",
      estado: "activo",
      contacto: "Mariana Soto",
      correo: "mariana.soto@valleazul.cl",
      telefono: "+56 9 4567 8890",
      ultimoTrabajo: "Mantencion de estructura norte",
      balancePendiente: 1850000,
    },
    {
      id: "CL-002",
      nombre: "Logistica Ruta Sur",
      rubro: "Logistica",
      ciudad: "Concepcion",
      estado: "enRiesgo",
      contacto: "Luis Barrera",
      correo: "lbarrera@rutasur.cl",
      telefono: "+56 9 3344 9900",
      ultimoTrabajo: "Revision de patio de carga",
      balancePendiente: 3290000,
    },
  ],
});

class ClientesRepository {
  findAll() {
    return clientesStore.list();
  }

  findById(clienteId) {
    return clientesStore.getById(clienteId);
  }

  create(payload) {
    return clientesStore.create(payload);
  }

  update(clienteId, patch) {
    return clientesStore.update(clienteId, patch);
  }

  delete(clienteId) {
    return clientesStore.remove(clienteId);
  }
}

module.exports = { clientesRepository: new ClientesRepository() };
