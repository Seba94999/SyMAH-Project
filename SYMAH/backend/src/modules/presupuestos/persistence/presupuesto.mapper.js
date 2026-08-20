function toDomain(document) {
  if (!document) {
    return null;
  }

  return {
    id: document.codigo,
    cliente: document.cliente.codigo,
    descripcion: document.descripcion,
    estado: document.estado,
    fecha: document.fecha,
    monto: document.monto,
    presupuesto: document.presupuesto ?? null,
    clienteRegistrado: document.clienteRegistrado,
    trabajo: document.trabajo ? document.trabajo.codigo : null,
  };
}

function toPersistence(entity) {
  if (!entity) {
    return {};
  }

  const persistence = {};

  if (entity.id !== undefined) {
    persistence.codigo = entity.id;
  }

  if (entity.descripcion !== undefined) {
    persistence.descripcion = entity.descripcion;
  }

  if (entity.estado !== undefined) {
    persistence.estado = entity.estado;
  }

  if (entity.fecha !== undefined) {
    persistence.fecha = entity.fecha;
  }

  if (entity.monto !== undefined) {
    persistence.monto = entity.monto;
  }

  if (entity.presupuesto !== undefined) {
    persistence.presupuesto = entity.presupuesto;
  }

  if (entity.clienteRegistrado !== undefined) {
    persistence.clienteRegistrado = entity.clienteRegistrado;
  }

  return persistence;
}

module.exports = {
  toDomain,
  toPersistence,
};
