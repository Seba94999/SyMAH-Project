const { createTrabajo } = require("../entities/trabajo.entity");

const { ClienteModel } = require("../../clientes/persistence/cliente.schema");

const {
  EmpleadoModel,
} = require("../../empleados/persistence/empleado.schema");

const {
  resolveObjectId,
} = require("../../../shared/persistence/reference-resolver");

function toDomain(document) {
  if (!document) {
    return null;
  }

  const clienteId = document.cliente?.codigo || document.cliente?.toString();
  const clienteNombre = document.cliente?.nombre || clienteId;

  const responsableId =
    document.responsable?.codigo || document.responsable?.toString();

  return createTrabajo({
    id: document.codigo,

    nombre: document.nombre,

    clienteId,
    cliente: clienteNombre,

    responsableId,
    responsable: document.responsable?.nombre || responsableId,

    estado: document.estado,
    prioridad: document.prioridad,

    monto: document.monto,
    gastoManoObra: document.gastoManoObra,
    cobrado: document.cobrado,
    saldoPorCobrar: document.saldoPorCobrar,

    ultimaActualizacion:
      document.ultimaActualizacion instanceof Date
        ? document.ultimaActualizacion.toISOString().slice(0, 10)
        : document.ultimaActualizacion,
  });
}

async function toPersistence(trabajo) {
  const persistence = {
    codigo: trabajo.id,

    nombre: trabajo.nombre,

    estado: trabajo.estado,
    prioridad: trabajo.prioridad,

    monto: trabajo.monto,
    gastoManoObra: trabajo.gastoManoObra,
    cobrado: trabajo.cobrado,
    saldoPorCobrar: trabajo.saldoPorCobrar,

    ultimaActualizacion: trabajo.ultimaActualizacion,
  };

  if (trabajo.clienteId) {
    persistence.cliente = await resolveObjectId(
      ClienteModel,
      trabajo.clienteId,
      "Cliente",
    );
  }

  if (trabajo.responsableId) {
    persistence.responsable = await resolveObjectId(
      EmpleadoModel,
      trabajo.responsableId,
      "Empleado",
    );
  }

  return persistence;
}

module.exports = {
  toDomain,
  toPersistence,
};
