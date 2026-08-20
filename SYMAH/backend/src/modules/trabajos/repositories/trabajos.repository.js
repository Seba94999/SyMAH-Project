const { TrabajoModel } = require("../persistence/trabajo.schema");
const { toDomain, toPersistence } = require("../persistence/trabajo.mapper");
const { generateCode } = require("../../../shared/persistence/code-generator");
const { ClienteModel } = require("../../clientes/persistence/cliente.schema");
const {
  EmpleadoModel,
} = require("../../empleados/persistence/empleado.schema");

const {
  resolveObjectId,
} = require("../../../shared/persistence/reference-resolver");

class TrabajosRepository {
  async #populate(document) {
    await document.populate("cliente");
    await document.populate("responsable");

    return document;
  }

  async findAll() {
    const documents = await TrabajoModel.find()
      .populate("cliente")
      .populate("responsable");

    return documents.map(toDomain);
  }

  async findById(trabajoId) {
    const document = await TrabajoModel.findOne({
      codigo: trabajoId,
    })
      .populate("cliente")
      .populate("responsable");

    return toDomain(document);
  }

  async findByCliente(clienteCodigo) {
    console.log("findByCliente:", clienteCodigo);
    const documents = await TrabajoModel.find({
      cliente: await resolveObjectId(ClienteModel, clienteCodigo, "Cliente"),
    })
      .populate("cliente")
      .populate("responsable");

    return documents.map(toDomain);
  }

  async create(payload) {
    const codigo = await generateCode(TrabajoModel, "TR");

    const persistence = await toPersistence({
      ...payload,
      id: codigo,
    });

    const cliente = await resolveObjectId(
      ClienteModel,
      payload.clienteId,
      "Cliente",
    );

    const responsable = await resolveObjectId(
      EmpleadoModel,
      payload.responsableId,
      "Empleado",
    );

    const data = {
      ...persistence,
      cliente,
      responsable,
    };

    console.log("DATA ANTES DE MONGOOSE:", data);

    const document = new TrabajoModel(data);

    console.log("DOCUMENTO ANTES DE SAVE:", document.toObject());

    await document.save();

    return toDomain(await this.#populate(document));
  }

  async update(trabajoId, patch) {
    const document = await TrabajoModel.findOne({
      codigo: trabajoId,
    });

    if (!document) {
      return null;
    }

    if (patch.clienteId) {
      document.cliente = await resolveObjectId(
        ClienteModel,
        patch.clienteId,
        "Cliente",
      );
    }

    if (patch.responsableId) {
      document.responsable = await resolveObjectId(
        EmpleadoModel,
        patch.responsableId,
        "Empleado",
      );
    }

    if (patch.nombre !== undefined) {
      document.nombre = patch.nombre;
    }

    if (patch.estado !== undefined) {
      document.estado = patch.estado;
    }

    if (patch.prioridad !== undefined) {
      document.prioridad = patch.prioridad;
    }

    if (patch.monto !== undefined) {
      document.monto = patch.monto;
    }

    if (patch.gastoManoObra !== undefined) {
      document.gastoManoObra = patch.gastoManoObra;
    }

    if (patch.cobrado !== undefined) {
      document.cobrado = patch.cobrado;
    }

    if (patch.saldoPorCobrar !== undefined) {
      document.saldoPorCobrar = patch.saldoPorCobrar;
    }

    if (patch.ultimaActualizacion !== undefined) {
      document.ultimaActualizacion = patch.ultimaActualizacion;
    }

    await document.save();

    return toDomain(await this.#populate(document));
  }

  async delete(trabajoId) {
    const document = await TrabajoModel.findOneAndDelete({
      codigo: trabajoId,
    });

    return !!document;
  }
}

module.exports = {
  trabajosRepository: new TrabajosRepository(),
};
