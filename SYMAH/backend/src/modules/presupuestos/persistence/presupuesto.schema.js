const mongoose = require("mongoose");

const PresupuestoSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    },

    descripcion: {
      type: String,
      required: true,
      trim: true,
    },

    estado: {
      type: String,
      enum: ["pendiente", "aprobado", "rechazado"],
      required: true,
    },

    fecha: {
      type: String,
      required: true,
    },

    monto: {
      type: Number,
      required: true,
      min: 0,
    },

    presupuesto: {
      type: String,
      default: null,
    },

    clienteRegistrado: {
      type: Boolean,
      default: true,
    },

    trabajo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trabajo",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const PresupuestoModel = mongoose.model("Presupuesto", PresupuestoSchema);

module.exports = {
  PresupuestoModel,
};
