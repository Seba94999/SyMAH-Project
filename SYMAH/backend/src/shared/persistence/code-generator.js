async function generateCode(Model, prefix) {
  const documents = await Model.find({}, "codigo").lean();

  let max = 0;

  for (const document of documents) {
    const match = document.codigo?.match(/\d+$/);

    if (!match) {
      continue;
    }

    max = Math.max(max, Number(match[0]));
  }

  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
}

module.exports = {
  generateCode,
};
