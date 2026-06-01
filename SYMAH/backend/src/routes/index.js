const express = require("express");
const modules = require("../modules");
const { createCrudRouter } = require("./crud-router");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "symah-backend" });
});

router.use("/clientes", createCrudRouter(modules.clientes.clientesRepository));
router.use(
  "/empleados",
  createCrudRouter(modules.empleados.empleadosRepository),
);
router.use("/trabajos", createCrudRouter(modules.trabajos.trabajosRepository));
router.use(
  "/presupuestos",
  createCrudRouter(modules.presupuestos.presupuestosRepository),
);
router.use("/finanzas", createCrudRouter(modules.finanzas.finanzasRepository));

const jornadasRouter = createCrudRouter(modules.jornadas.jornadasRepository, {
  listResolver: (req) => {
    const { empleadoId, trabajoId } = req.query;

    if (empleadoId) {
      return modules.jornadas.jornadasRepository.findByEmpleadoId(empleadoId);
    }

    if (trabajoId) {
      return modules.jornadas.jornadasRepository.findByTrabajoId(trabajoId);
    }

    return modules.jornadas.jornadasRepository.findAll();
  },
});
router.use("/jornadas", jornadasRouter);

module.exports = router;
