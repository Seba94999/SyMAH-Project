const express = require("express");

function createCrudRouter(repository, options = {}) {
  const router = express.Router();
  const listResolver = options.listResolver;

  router.get("/", (req, res) => {
    if (typeof listResolver === "function") {
      res.json(listResolver(req));
      return;
    }

    res.json(repository.findAll());
  });

  router.get("/:id", (req, res) => {
    const item = repository.findById(req.params.id);

    if (!item) {
      res.status(404).json({ message: "Resource not found" });
      return;
    }

    res.json(item);
  });

  router.post("/", (req, res, next) => {
    try {
      const created = repository.create(req.body || {});
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  });

  router.patch("/:id", (req, res, next) => {
    try {
      const updated = repository.update(req.params.id, req.body || {});

      if (!updated) {
        res.status(404).json({ message: "Resource not found" });
        return;
      }

      res.json(updated);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", (req, res) => {
    const deleted = repository.delete(req.params.id);

    if (!deleted) {
      res.status(404).json({ message: "Resource not found" });
      return;
    }

    res.status(204).send();
  });

  return router;
}

module.exports = { createCrudRouter };
