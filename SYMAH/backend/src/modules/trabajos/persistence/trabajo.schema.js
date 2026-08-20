const mongoose = require("mongoose");

const {
  TRABAJO_ESTADOS,
  TRABAJO_PRIORIDADES,
} = require("../entities/trabajo.entity");

const trabajoSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
      index: true,
    },

    responsable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empleado",
      required: true,
      index: true,
    },

    estado: {
      type: String,
      enum: TRABAJO_ESTADOS,
      required: true,
      default: "enCurso",
      index: true,
    },

    prioridad: {
      type: String,
      enum: TRABAJO_PRIORIDADES,
      required: true,
      default: "Media",
      index: true,
    },

    monto: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    gastoManoObra: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    cobrado: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    saldoPorCobrar: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    ultimaActualizacion: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    collection: "trabajos",
    timestamps: true,
    versionKey: false,
  },
);

const TrabajoModel = mongoose.model("Trabajo", trabajoSchema);

module.exports = {
  TrabajoModel,
};
