const { EmpleadoModel } = require("../persistence/empleado.schema");
const { toDomain, toPersistence } = require("../persistence/empleado.mapper");
const { generateCode } = require("../../../shared/persistence/code-generator");

class EmpleadosRepository {
  async findAll() {
    const documents = await EmpleadoModel.find();

    return documents.map(toDomain);
  }

  async findById(codigo) {
    const document = await EmpleadoModel.findOne({ codigo });

    return toDomain(document);
  }

  async create(payload) {
    const codigo = await generateCode(EmpleadoModel, "EMP");

    const document = new EmpleadoModel(
      toPersistence({
        ...payload,
        id: codigo,
      }),
    );

    await document.save();

    return toDomain(document);
  }

  async update(codigo, patch) {
    const document = await EmpleadoModel.findOne({
      codigo,
    });

    if (!document) {
      return null;
    }

    if (patch.nombre !== undefined) {
      document.nombre = patch.nombre;
    }

    if (patch.apellido !== undefined) {
      document.apellido = patch.apellido;
    }

    if (patch.dni !== undefined) {
      document.dni = patch.dni;
    }

    if (patch.cargo !== undefined) {
      document.cargo = patch.cargo;
    }

    if (patch.estado !== undefined) {
      document.estado = patch.estado;
    }

    if (patch.sueldo !== undefined) {
      document.sueldo = patch.sueldo;
    }

    if (patch.pagoPorJornada !== undefined) {
      document.pagoPorJornada = patch.pagoPorJornada;
    }

    if (patch.horasMes !== undefined) {
      document.horasMes = patch.horasMes;
    }

    if (patch.tarifaPorHora !== undefined) {
      document.tarifaPorHora = patch.tarifaPorHora;
    }

    if (patch.pagado !== undefined) {
      document.pagado = patch.pagado;
    }

    if (patch.saldo !== undefined) {
      document.saldo = patch.saldo;
    }

    await document.save();

    return toDomain(document);
  }

  async delete(codigo) {
    const deleted = await EmpleadoModel.findOneAndDelete({
      codigo,
    });

    return !!deleted;
  }
}

module.exports = {
  empleadosRepository: new EmpleadosRepository(),
};
