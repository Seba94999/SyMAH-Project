const { JornadaModel } = require("../persistence/jornada.schema");
const { toDomain, toPersistence } = require("../persistence/jornada.mapper");
const { generateCode } = require("../../../shared/persistence/code-generator");

const {
  resolveObjectId,
} = require("../../../shared/persistence/reference-resolver");

const {
  EmpleadoModel,
} = require("../../empleados/persistence/empleado.schema");

const { TrabajoModel } = require("../../trabajos/persistence/trabajo.schema");
class JornadasRepository {
  async #populate(document) {
    await document.populate("empleado");
    await document.populate("trabajo");
    return document;
  }
  async findAll() {
    const documents = await JornadaModel.find()
      .populate("empleado")
      .populate("trabajo");

    return documents.map(toDomain);
  }

  async findById(codigo) {
    const document = await JornadaModel.findOne({
      codigo,
    })
      .populate("empleado")
      .populate("trabajo");

    return toDomain(document);
  }

  async findByEmpleado(empleadoCodigo) {
    const empleado = await EmpleadoModel.findOne({
      codigo: empleadoCodigo,
    });

    if (!empleado) {
      return [];
    }

    const documents = await JornadaModel.find({
      empleado: empleado._id,
    })
      .populate("empleado")
      .populate("trabajo");

    return documents.map(toDomain);
  }

  async findByTrabajo(trabajoCodigo) {
    const trabajo = await TrabajoModel.findOne({
      codigo: trabajoCodigo,
    });

    if (!trabajo) {
      return [];
    }

    const documents = await JornadaModel.find({
      trabajo: trabajo._id,
    })
      .populate("empleado")
      .populate("trabajo");

    return documents.map(toDomain);
  }

  async create(payload) {
    const codigo = await generateCode(JornadaModel, "JR");

    const empleado = await resolveObjectId(
      EmpleadoModel,
      payload.empleadoId,
      "Empleado",
    );

    const trabajo = await resolveObjectId(
      TrabajoModel,
      payload.trabajoId,
      "Trabajo",
    );

    const persistence = toPersistence({
      ...payload,
      id: codigo,
    });

    const document = new JornadaModel({
      ...persistence,
      empleado,
      trabajo,
    });

    await document.save();

    const populatedDocument = await this.#populate(document);

    const domain = toDomain(populatedDocument);

    return domain;
  }

  async update(codigo, patch) {
    const document = await JornadaModel.findOne({
      codigo,
    });

    if (!document) {
      return null;
    }

    if (patch.empleadoId !== undefined) {
      const empleado = await EmpleadoModel.findOne({
        codigo: patch.empleadoId,
      });

      if (!empleado) {
        throw new Error(`Empleado '${patch.empleadoId}' no encontrado.`);
      }

      document.empleado = empleado._id;
    }

    if (patch.trabajoId !== undefined) {
      const trabajo = await TrabajoModel.findOne({
        codigo: patch.trabajoId,
      });

      if (!trabajo) {
        throw new Error(`Trabajo '${patch.trabajoId}' no encontrado.`);
      }

      document.trabajo = trabajo._id;
    }

    if (patch.fecha !== undefined) {
      document.fecha = patch.fecha;
    }

    if (patch.inicio !== undefined) {
      document.inicio = patch.inicio;
    }

    if (patch.fin !== undefined) {
      document.fin = patch.fin;
    }

    if (patch.notas !== undefined) {
      document.notas = patch.notas;
    }

    await document.save();

    return toDomain(await this.#populate(document));
  }

  async delete(codigo) {
    const deleted = await JornadaModel.findOneAndDelete({
      codigo,
    });

    return !!deleted;
  }
}

module.exports = {
  jornadasRepository: new JornadasRepository(),
};
