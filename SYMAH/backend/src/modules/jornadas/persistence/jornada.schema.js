const mongoose = require("mongoose");

const jornadaSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    empleado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empleado",
      required: true,
      index: true,
    },

    trabajo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trabajo",
      required: true,
      index: true,
    },

    fecha: {
      type: String,
      required: true,
    },

    inicio: {
      type: String,
      required: true,
      trim: true,
    },

    fin: {
      type: String,
      required: true,
      trim: true,
    },

    notas: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    collection: "jornadas",
    timestamps: true,
    versionKey: false,
  },
);

const JornadaModel = mongoose.model("Jornada", jornadaSchema);

module.exports = {
  JornadaModel,
};
