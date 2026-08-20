const mongoose = require("mongoose");

const {
  EMPLEADO_ESTADOS,
  JORNADAS_VALIDAS,
} = require("../entities/empleado.entity");

const empleadoSchema = new mongoose.Schema(
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

    cargo: {
      type: String,
      required: true,
      trim: true,
    },

    sede: {
      type: String,
      default: "",
      trim: true,
    },

    estado: {
      type: String,
      enum: EMPLEADO_ESTADOS,
      required: true,
      default: "activo",
      index: true,
    },

    jornada: {
      type: String,
      enum: JORNADAS_VALIDAS,
      required: true,
    },

    saldo: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    horasMes: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    tarifaPorHora: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    pagado: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    ultimaActividad: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    collection: "empleados",
    timestamps: true,
    versionKey: false,
  },
);

const EmpleadoModel = mongoose.model("Empleado", empleadoSchema);

module.exports = {
  EmpleadoModel,
};
