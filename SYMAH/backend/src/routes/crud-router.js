const express = require("express");

function createCrudRouter(service, options = {}) {
  const router = express.Router();
  const listResolver = options.listResolver;

  router.get("/", async (req, res, next) => {
    try {
      if (typeof listResolver === "function") {
        return res.json(await listResolver(req));
      }

      res.json(await service.getAll());
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const item = await service.getById(req.params.id);

      if (!item) {
        return res.status(404).json({
          message: "Resource not found",
        });
      }

      res.json(item);
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const created = await service.create(req.body || {});

      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  });

  router.patch("/:id", async (req, res, next) => {
    try {
      const updated = await service.update(req.params.id, req.body || {});

      if (!updated) {
        return res.status(404).json({
          message: "Resource not found",
        });
      }

      res.json(updated);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const deleted = await service.delete(req.params.id);

      if (!deleted) {
        return res.status(404).json({
          message: "Resource not found",
        });
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = {
  createCrudRouter,
};
