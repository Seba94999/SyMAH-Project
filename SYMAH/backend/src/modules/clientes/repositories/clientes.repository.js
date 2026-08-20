const { ClienteModel } = require("../persistence/cliente.schema");
const { toDomain, toPersistence } = require("../persistence/cliente.mapper");
const { generateCode } = require("../../../shared/persistence/code-generator");

class ClientesRepository {
  async findAll() {
    const documents = await ClienteModel.find();

    return documents.map(toDomain);
  }

  async findById(codigo) {
    const document = await ClienteModel.findOne({ codigo });

    return toDomain(document);
  }

  async create(payload) {
    const codigo = await generateCode(ClienteModel, "CL");

    const document = new ClienteModel(
      toPersistence({
        ...payload,
        id: codigo,
      }),
    );

    await document.save();

    return toDomain(document);
  }

  async update(codigo, patch) {
    const document = await ClienteModel.findOne({ codigo });

    if (!document) {
      return null;
    }

    if (patch.nombre !== undefined) {
      document.nombre = patch.nombre;
    }

    if (patch.rubro !== undefined) {
      document.rubro = patch.rubro;
    }

    if (patch.direccion !== undefined) {
      document.direccion = patch.direccion;
    }

    if (patch.estado !== undefined) {
      document.estado = patch.estado;
    }

    if (patch.contacto !== undefined) {
      document.contacto = patch.contacto;
    }

    if (patch.correo !== undefined) {
      document.correo = patch.correo;
    }

    if (patch.telefono !== undefined) {
      document.telefono = patch.telefono;
    }

    if (patch.ultimoTrabajo !== undefined) {
      document.ultimoTrabajo = patch.ultimoTrabajo;
    }

    if (patch.balancePendiente !== undefined) {
      document.balancePendiente = patch.balancePendiente;
    }

    await document.save();

    return toDomain(document);
  }

  async delete(codigo) {
    const deleted = await ClienteModel.findOneAndDelete({ codigo });

    return !!deleted;
  }
}

module.exports = {
  clientesRepository: new ClientesRepository(),
};
