const { createTransaccion } = require("../entities/transaccion.entity");

const { ClienteModel } = require("../../clientes/persistence/cliente.schema");

const {
  EmpleadoModel,
} = require("../../empleados/persistence/empleado.schema");

const { TrabajoModel } = require("../../trabajos/persistence/trabajo.schema");

const { JornadaModel } = require("../../jornadas/persistence/jornada.schema");

const {
  resolveObjectId,
} = require("../../../shared/persistence/reference-resolver");

const referenceModels = {
  cliente: {
    model: ClienteModel,
    name: "Cliente",
  },

  empleado: {
    model: EmpleadoModel,
    name: "Empleado",
  },

  trabajo: {
    model: TrabajoModel,
    name: "Trabajo",
  },

  jornada: {
    model: JornadaModel,
    name: "Jornada",
  },
};

function resolveReferenceModel(entityType) {
  const reference = referenceModels[entityType];

  if (!reference) {
    throw new Error(`Tipo de entidad no soportado: '${entityType}'`);
  }

  return reference;
}

function isReferenceEntity(entityType) {
  return Object.prototype.hasOwnProperty.call(referenceModels, entityType);
}

function getCodigo(value) {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  return value.codigo || "";
}

function getNombreCliente(cliente) {
  if (!cliente) return "";

  if (typeof cliente === "string") {
    return cliente;
  }

  return cliente.nombre || "";
}

function toDomain(document) {
  if (!document) {
    return null;
  }

  return createTransaccion({
    id: document.codigo,

    tipo: document.tipo,
    fecha: document.fecha,
    monto: document.monto,

    concepto: document.concepto,
    observaciones: document.observaciones,

    estado: document.estado,

    cliente: getNombreCliente(document.cliente),

    entidadOrigen: document.entidadOrigen,
    entidadOrigenId: getCodigo(document.entidadOrigenId),

    entidadDestino: document.entidadDestino,
    entidadDestinoId: getCodigo(document.entidadDestinoId),
  });
}

async function toPersistence(domain) {
  const persistence = {
    codigo:
      domain.id ||
      `TRX-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`,
  };

  if ("id" in domain) {
    persistence.codigo = domain.id;
  }

  if ("tipo" in domain) {
    persistence.tipo = domain.tipo;
  }

  if ("fecha" in domain) {
    persistence.fecha = domain.fecha;
  }

  if ("monto" in domain) {
    persistence.monto = domain.monto;
  }

  if ("concepto" in domain) {
    persistence.concepto = domain.concepto;
  }

  if ("observaciones" in domain) {
    persistence.observaciones = domain.observaciones;
  }

  if ("estado" in domain) {
    persistence.estado = domain.estado;
  }

  if ("cliente" in domain && domain.cliente) {
    persistence.cliente = await resolveObjectId(
      ClienteModel,
      domain.cliente,
      "Cliente",
    );
  }

  if ("entidadOrigen" in domain) {
    persistence.entidadOrigen = domain.entidadOrigen;
  }

  if (
    domain.entidadOrigen &&
    domain.entidadOrigenId &&
    isReferenceEntity(domain.entidadOrigen)
  ) {
    const reference = resolveReferenceModel(domain.entidadOrigen);

    persistence.entidadOrigenId = await resolveObjectId(
      reference.model,
      domain.entidadOrigenId,
      reference.name,
    );

    persistence.entidadOrigenModel = reference.name;
  }

  if ("entidadDestino" in domain) {
    persistence.entidadDestino = domain.entidadDestino;
  }

  if (
    domain.entidadDestino &&
    domain.entidadDestinoId &&
    isReferenceEntity(domain.entidadDestino)
  ) {
    const reference = resolveReferenceModel(domain.entidadDestino);

    persistence.entidadDestinoId = await resolveObjectId(
      reference.model,
      domain.entidadDestinoId,
      reference.name,
    );

    persistence.entidadDestinoModel = reference.name;
  }

  return persistence;
}

module.exports = {
  toDomain,
  toPersistence,
};
