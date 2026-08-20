const express = require("express");
const modules = require("../modules");
const { createCrudRouter } = require("./crud-router");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "symah-backend",
  });
});

router.use("/clientes", createCrudRouter(modules.clientes.clientesService));

router.use("/empleados", createCrudRouter(modules.empleados.empleadosService));

router.use("/trabajos", createCrudRouter(modules.trabajos.trabajosService));

router.use(
  "/presupuestos",
  createCrudRouter(modules.presupuestos.presupuestosService),
);

router.use(
  "/transacciones",
  createCrudRouter(modules.transacciones.transaccionesService),
);

router.use("/finanzas", createCrudRouter(modules.finanzas.finanzasService));

router.use(
  "/presupuestos",
  createCrudRouter(modules.presupuestos.presupuestosService),
);

const jornadasRouter = createCrudRouter(modules.jornadas.jornadasService, {
  listResolver: async (req) => {
    const { empleado, empleadoId, trabajo, trabajoId } = req.query;

    const empleadoCodigo = empleado || empleadoId;
    const trabajoCodigo = trabajo || trabajoId;

    if (empleadoCodigo) {
      return modules.jornadas.jornadasService.getByEmpleado(empleadoCodigo);
    }

    if (trabajoCodigo) {
      return modules.jornadas.jornadasService.getByTrabajo(trabajoCodigo);
    }

    return modules.jornadas.jornadasService.getAll();
  },
});

router.use("/jornadas", jornadasRouter);

module.exports = router;
