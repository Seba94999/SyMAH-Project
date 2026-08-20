const mongoose = require("mongoose");

const transaccionSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    tipo: {
      type: String,
      enum: [
        "ingreso",
        "cobro",
        "gasto",
        "pago",
        "jornada",
        "ajuste",
        "prestamo",
      ],
      required: true,
      index: true,
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

    concepto: {
      type: String,
      required: true,
      trim: true,
    },

    observaciones: {
      type: String,
      default: "",
      trim: true,
    },

    estado: {
      type: String,
      enum: ["activa", "anulada", "revertida"],
      default: "activa",
      required: true,
      index: true,
    },

    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      default: null,
    },

    entidadOrigen: {
      type: String,
      trim: true,
      default: "",
    },

    entidadOrigenId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "entidadOrigenModel",
      default: null,
    },

    entidadOrigenModel: {
      type: String,
      enum: ["Cliente", "Empleado", "Trabajo", "Jornada"],
      default: null,
    },

    entidadDestino: {
      type: String,
      trim: true,
      default: "",
    },

    entidadDestinoId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "entidadDestinoModel",
      default: null,
    },

    entidadDestinoModel: {
      type: String,
      enum: ["Cliente", "Empleado", "Trabajo", "Jornada"],
      default: null,
    },
  },
  {
    collection: "transacciones",
    timestamps: true,
    versionKey: false,
  },
);

module.exports = {
  TransaccionModel: mongoose.model("Transaccion", transaccionSchema),
};
