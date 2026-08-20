async function resolveDocument(Model, codigo, entityName) {
  const query = { codigo };
  const document = await Model.findOne(query);

  if (document) {
    return document;
  }

  const hasNameField = typeof Model.schema?.paths?.nombre !== "undefined";

  if (hasNameField) {
    const nameDocument = await Model.findOne({ nombre: codigo });

    if (nameDocument) {
      return nameDocument;
    }
  }

  throw new Error(`${entityName} '${codigo}' no encontrado.`);
}

async function resolveObjectId(Model, codigo, entityName) {
  const document = await resolveDocument(Model, codigo, entityName);

  return document._id;
}

async function resolveOptionalObjectId(Model, codigo, entityName) {
  if (!codigo) {
    return undefined;
  }

  return resolveObjectId(Model, codigo, entityName);
}

module.exports = {
  resolveDocument,
  resolveObjectId,
};
