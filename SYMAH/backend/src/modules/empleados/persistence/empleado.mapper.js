const { createEmpleado } = require("../entities/empleado.entity");

function toDomain(document) {
  if (!document) {
    return null;
  }

  return createEmpleado({
    id: document.codigo,

    nombre: document.nombre,
    cargo: document.cargo,
    sede: document.sede,

    estado: document.estado,
    jornada: document.jornada,

    saldo: document.saldo,
    horasMes: document.horasMes,
    tarifaPorHora: document.tarifaPorHora,
    pagado: document.pagado,
    saldoPorPagar: document.saldo ?? document.saldoPorPagar ?? 0,

    ultimaActividad: document.ultimaActividad,
  });
}

function toPersistence(empleado) {
  return {
    codigo: empleado.id,

    nombre: empleado.nombre,
    cargo: empleado.cargo,
    sede: empleado.sede,

    estado: empleado.estado,
    jornada: empleado.jornada,

    saldo: empleado.saldo,
    horasMes: empleado.horasMes,
    tarifaPorHora: empleado.tarifaPorHora,
    pagado: empleado.pagado,
    saldoPorPagar: empleado.saldo ?? empleado.saldoPorPagar ?? 0,

    ultimaActividad: empleado.ultimaActividad,
  };
}

module.exports = {
  toDomain,
  toPersistence,
};
