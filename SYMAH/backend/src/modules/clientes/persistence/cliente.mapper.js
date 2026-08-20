function toDomain(document) {
  if (!document) {
    return null;
  }

  return {
    id: document.codigo,
    nombre: document.nombre,
    direccion: document.direccion,
    estado: document.estado,
    correo: document.correo,
    telefono: document.telefono,
  };
}

function toPersistence(cliente) {
  const persistence = {};

  if (cliente.id !== undefined) {
    persistence.codigo = cliente.id;
  }

  if (cliente.nombre !== undefined) {
    persistence.nombre = cliente.nombre;
  }

  if (cliente.direccion !== undefined) {
    persistence.direccion = cliente.direccion;
  }

  if (cliente.estado !== undefined) {
    persistence.estado = cliente.estado;
  }

  if (cliente.correo !== undefined) {
    persistence.correo = cliente.correo;
  }

  if (cliente.telefono !== undefined) {
    persistence.telefono = cliente.telefono;
  }

  return persistence;
}

module.exports = {
  toDomain,
  toPersistence,
};
