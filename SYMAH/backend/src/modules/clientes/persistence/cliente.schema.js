const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    direccion: {
      type: String,
      required: true,
      trim: true,
    },
    estado: {
      type: String,
      required: true,
      enum: ["activo", "enRiesgo", "inactivo"],
      default: "activo",
    },
    correo: {
      type: String,
      default: "",
      trim: true,
    },
    telefono: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const ClienteModel = mongoose.model("Cliente", clienteSchema);

module.exports = {
  ClienteModel,
};
