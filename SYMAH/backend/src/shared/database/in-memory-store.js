const { DomainError } = require("../errors/domain-error");

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function extractNumericId(id, prefix) {
  if (typeof id !== "string" || !id.startsWith(`${prefix}-`)) {
    return 0;
  }

  const value = Number.parseInt(id.split("-")[1], 10);
  return Number.isNaN(value) ? 0 : value;
}

function createInMemoryCollection({
  collectionName,
  idPrefix,
  initialData = [],
  hydrate,
}) {
  const records = new Map();
  let nextNumber = 1;

  initialData.forEach((item) => {
    const hydrated = hydrate(item);
    records.set(hydrated.id, cloneValue(hydrated));

    const idNumber = extractNumericId(hydrated.id, idPrefix);
    if (idNumber >= nextNumber) {
      nextNumber = idNumber + 1;
    }
  });

  function generateId() {
    const generatedId = `${idPrefix}-${String(nextNumber).padStart(3, "0")}`;
    nextNumber += 1;
    return generatedId;
  }

  return {
    list() {
      return Array.from(records.values()).map(cloneValue);
    },

    getById(id) {
      const item = records.get(id);
      return item ? cloneValue(item) : null;
    },

    create(data) {
      const id = data.id || generateId();
      if (records.has(id)) {
        throw new DomainError(
          `${collectionName} with id ${id} already exists`,
          {
            collectionName,
            id,
          },
        );
      }

      const hydrated = hydrate({ ...data, id });
      records.set(id, cloneValue(hydrated));
      return cloneValue(hydrated);
    },

    update(id, patch) {
      const current = records.get(id);
      if (!current) {
        return null;
      }

      const hydrated = hydrate({ ...current, ...patch, id });
      records.set(id, cloneValue(hydrated));
      return cloneValue(hydrated);
    },

    remove(id) {
      return records.delete(id);
    },

    exists(id) {
      return records.has(id);
    },
  };
}

module.exports = { createInMemoryCollection };
