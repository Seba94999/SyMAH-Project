const { TransaccionModel } = require("../persistence/transaccion.schema");

const { TrabajoModel } = require("../../trabajos/persistence/trabajo.schema");

const {
  EmpleadoModel,
} = require("../../empleados/persistence/empleado.schema");

const {
  toDomain,
  toPersistence,
} = require("../persistence/transaccion.mapper");

const {
  resolveObjectId,
} = require("../../../shared/persistence/reference-resolver");

class TransaccionesRepository {
  async findAll() {
    const documents = await TransaccionModel.find()
      .populate("cliente")
      .populate("entidadOrigenId")
      .populate("entidadDestinoId");

    return documents.map(toDomain);
  }

  async findById(id) {
    const document = await TransaccionModel.findOne({
      codigo: id,
    })
      .populate("cliente")
      .populate("entidadOrigenId")
      .populate("entidadDestinoId");

    return document ? toDomain(document) : null;
  }

  async findByTrabajoId(codigoTrabajo) {
    const trabajoId = await resolveObjectId(
      TrabajoModel,
      codigoTrabajo,
      "Trabajo",
    );

    const documents = await TransaccionModel.find({
      entidadOrigen: "trabajo",
      entidadOrigenId: trabajoId,
    }).populate("cliente");

    return documents.map(toDomain);
  }

  async findByEmpleadoId(codigoEmpleado) {
    const empleadoId = await resolveObjectId(
      EmpleadoModel,
      codigoEmpleado,
      "Empleado",
    );

    const documents = await TransaccionModel.find({
      entidadDestino: "empleado",
      entidadDestinoId: empleadoId,
    }).populate("cliente");

    return documents.map(toDomain);
  }

  async create(payload) {
    const persistence = await toPersistence(payload);

    const document = await TransaccionModel.create(persistence);

    await document.populate("cliente");
    await document.populate("entidadOrigenId");
    await document.populate("entidadDestinoId");

    return toDomain(document);
  }

  async update(id, patch) {
    const persistence = await toPersistence(patch);

    const document = await TransaccionModel.findOneAndUpdate(
      {
        codigo: id,
      },
      persistence,
      {
        new: true,
      },
    )
      .populate("cliente")
      .populate("entidadOrigenId")
      .populate("entidadDestinoId");

    return document ? toDomain(document) : null;
  }

  async delete(id) {
    const deleted = await TransaccionModel.findOneAndDelete({
      codigo: id,
    });

    return !!deleted;
  }
}

module.exports = {
  transaccionesRepository: new TransaccionesRepository(),
};
