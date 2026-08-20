const {
  transaccionesRepository,
} = require("../../transacciones/repositories/transacciones.repository");

class FinanzasService {
  async getMovimientos() {
    return transaccionesRepository.findAll();
  }

  async getMovimiento(id) {
    return transaccionesRepository.findById(id);
  }

  async getMovimientosByTrabajo(trabajoId) {
    return transaccionesRepository.findByTrabajoId(trabajoId);
  }

  async getMovimientosByEmpleado(empleadoId) {
    return transaccionesRepository.findByEmpleadoId(empleadoId);
  }

  async getResumenGeneral() {
    const movimientos = await transaccionesRepository.findAll();

    const resumen = {
      ingresos: 0,
      gastos: 0,
      cobrado: 0,
      pagado: 0,
      prestamos: 0,
      ajustes: 0,
      saldoCaja: 0,
    };

    for (const movimiento of movimientos) {
      const monto = Number(movimiento.monto || 0);

      switch (movimiento.tipo) {
        case "ingreso":
          resumen.ingresos += monto;
          resumen.saldoCaja += monto;
          break;

        case "cobro":
          resumen.cobrado += monto;
          resumen.saldoCaja += monto;
          break;

        case "gasto":
          resumen.gastos += monto;
          resumen.saldoCaja -= monto;
          break;

        case "pago":
          resumen.pagado += monto;
          resumen.saldoCaja -= monto;
          break;

        case "prestamo":
          resumen.prestamos += monto;
          resumen.saldoCaja += monto;
          break;

        case "ajuste":
          resumen.ajustes += monto;
          resumen.saldoCaja += monto;
          break;
      }
    }

    return resumen;
  }
}

module.exports = {
  finanzasService: new FinanzasService(),
};
