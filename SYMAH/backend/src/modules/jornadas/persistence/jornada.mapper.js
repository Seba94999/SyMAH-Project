const { createJornada } = require("../entities/jornada.entity");

function toDomain(document) {
  if (!document) {
    return null;
  }

  const data = {
    id: document.codigo,
    empleado: document.empleado?.codigo || document.empleado,
    trabajo: document.trabajo?.codigo || document.trabajo,
    fecha: document.fecha,
    inicio: document.inicio,
    fin: document.fin,
    horas: document.horas,
    notas: document.notas,
  };

  return createJornada(data);
}

function toPersistence(domain) {
  if (!domain) {
    return {};
  }

  const persistence = {};

  if (domain.id !== undefined) {
    persistence.codigo = domain.id;
  }

  if (domain.empleado !== undefined) {
    persistence.empleado = domain.empleado;
  }

  if (domain.trabajo !== undefined) {
    persistence.trabajo = domain.trabajo;
  }

  if (domain.fecha !== undefined) {
    persistence.fecha = domain.fecha;
  }

  if (domain.inicio !== undefined) {
    persistence.inicio = domain.inicio;
  }

  if (domain.fin !== undefined) {
    persistence.fin = domain.fin;
  }

  if (domain.horas !== undefined) {
    persistence.horas = domain.horas;
  }

  if (domain.notas !== undefined) {
    persistence.notas = domain.notas;
  }

  return persistence;
}

module.exports = {
  toDomain,
  toPersistence,
};
