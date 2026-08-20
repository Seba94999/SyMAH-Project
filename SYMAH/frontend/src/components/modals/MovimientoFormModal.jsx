import { useEffect, useMemo, useState } from "react";
import Button from "../ui/Button.jsx";
import TextField from "../forms/TextField.jsx";
import SelectField from "../forms/SelectField.jsx";
import Modal from "./Modal.jsx";
import { FINANZAS_TIPOS } from "../../services/FinanzasService.jsx";
import useTrabajos from "../../hooks/useTrabajos.jsx";
import useEmpleados from "../../hooks/useEmpleados.jsx";
import {
  CalendarIcon,
  CheckIcon,
  CurrencyIcon,
  SearchIcon,
  TagIcon,
  XIcon,
} from "../ui/Icon.jsx";

const TIPO_OPTIONS = Object.entries(FINANZAS_TIPOS).map(([value, label]) => ({
  value,
  label,
}));

const TIPO_CONTEXTO = {
  ingreso: { entidadOrigen: "externo", entidadDestino: "caja" },
  cobro: { entidadOrigen: "trabajo", entidadDestino: "caja" },
  gasto: { entidadOrigen: "caja", entidadDestino: "proveedor" },
  pago: { entidadOrigen: "caja", entidadDestino: "empleado" },
};

function buildFormState(initial) {
  const tipo = initial?.tipo || "ingreso";
  const contexto = TIPO_CONTEXTO[tipo];

  return {
    tipo,
    concepto: initial?.concepto || "",
    referencia:
      initial?.referencia ||
      initial?.entidadOrigenId ||
      initial?.entidadDestinoId ||
      "",

    fecha: initial?.fecha || "",
    monto: initial?.monto?.toString() || "0",
    entidadOrigen: initial?.entidadOrigen || contexto.entidadOrigen,
    entidadOrigenId: initial?.entidadOrigenId || "",
    entidadDestino: initial?.entidadDestino || contexto.entidadDestino,
    entidadDestinoId: initial?.entidadDestinoId || "",
    observaciones: initial?.observaciones || "",
  };
}

export default function MovimientoFormModal({
  open,
  initial = null,
  onClose,
  onSubmit,
  submitting = false,
}) {
  const [form, setForm] = useState(() => buildFormState(initial));

  useEffect(() => {
    setForm(buildFormState(initial));
  }, [initial, open]);

  const { trabajos = [] } = useTrabajos();
  const { empleados = [] } = useEmpleados();

  const trabajosUltimos3Meses = useMemo(() => {
    return trabajos.filter((t) => {
      const fechaStr = t.fecha || t.ultimaActualizacion || null;

      if (!fechaStr) return false;

      const fecha = new Date(fechaStr);

      if (Number.isNaN(fecha.getTime())) return false;

      const cutoff = new Date();
      cutoff.setMonth(cutoff.getMonth() - 3);

      return fecha >= cutoff;
    });
  }, [trabajos]);

  const mostrarTrabajo = form.tipo === "cobro";
  const mostrarEmpleado = form.tipo === "pago";

  function setField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  useEffect(() => {
    setForm((current) => {
      const contexto = TIPO_CONTEXTO[current.tipo];

      return {
        ...current,
        entidadOrigen: contexto.entidadOrigen,
        entidadDestino: contexto.entidadDestino,
      };
    });
  }, [form.tipo]);

  useEffect(() => {
    if (form.tipo !== "cobro") {
      return;
    }

    if (!form.referencia) {
      setField("entidadOrigenId", "");
      return;
    }

    const trabajo = trabajos.find((t) => t.id === form.referencia);

    if (trabajo) {
      setField("entidadOrigenId", trabajo.id);
    }
  }, [form.referencia, form.tipo, trabajos]);

  useEffect(() => {
    if (form.tipo !== "pago") {
      return;
    }

    if (!form.referencia) {
      setField("entidadDestinoId", "");
      return;
    }

    const empleado = empleados.find((item) => item.id === form.referencia);

    if (empleado) {
      setField("entidadDestinoId", empleado.id);
    }
  }, [form.referencia, form.tipo, empleados]);

  function handleSubmit() {
    const contexto = TIPO_CONTEXTO[form.tipo];

    onSubmit({
      tipo: form.tipo,

      concepto: form.concepto,

      fecha: form.fecha,

      monto: Number(form.monto || 0),

      observaciones: form.observaciones,

      entidadOrigen: form.entidadOrigen || contexto.entidadOrigen,

      entidadOrigenId: form.entidadOrigenId || "",

      entidadDestino: form.entidadDestino || contexto.entidadDestino,

      entidadDestinoId: form.entidadDestinoId || "",
    });
  }
  return (
    <Modal
      open={open}
      title={initial ? "Editar transacción" : "Nueva transacción"}
      icon={<CurrencyIcon />}
      subtitle="Registro financiero alineado con el historial de transacciones del sistema."
      onClose={onClose}
      footer={
        <>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={submitting}
            iconLeft={<XIcon />}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            loading={submitting}
            onClick={handleSubmit}
            iconLeft={<CheckIcon />}
          >
            {initial ? "Guardar" : "Crear"}
          </Button>
        </>
      }
    >
      <div className="sy-stack">
        <div className="sy-form-grid sy-form-grid--2">
          <SelectField
            label="Tipo"
            iconLeft={<TagIcon />}
            value={form.tipo}
            onChange={(event) => setField("tipo", event.target.value)}
          >
            {TIPO_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>

          <TextField
            label="Fecha"
            type="date"
            iconLeft={<CalendarIcon />}
            value={form.fecha}
            onChange={(event) => setField("fecha", event.target.value)}
          />
        </div>

        <TextField
          label="Concepto"
          iconLeft={<SearchIcon />}
          value={form.concepto}
          onChange={(event) => setField("concepto", event.target.value)}
        />

        {mostrarTrabajo && (
          <>
            <SelectField
              label="Trabajo origen"
              iconLeft={<TagIcon />}
              value={form.referencia}
              onChange={(event) => setField("referencia", event.target.value)}
            >
              <option value="">Seleccionar trabajo</option>

              {trabajosUltimos3Meses.map((trabajo) => (
                <option key={trabajo.id} value={trabajo.id}>
                  {`${trabajo.nombre} — ${trabajo.id}`}
                </option>
              ))}
            </SelectField>
          </>
        )}

        {mostrarEmpleado && (
          <SelectField
            label="Empleado destino"
            iconLeft={<TagIcon />}
            value={form.referencia}
            onChange={(event) => setField("referencia", event.target.value)}
          >
            <option value="">Seleccionar empleado</option>

            {empleados.map((empleado) => (
              <option key={empleado.id} value={empleado.id}>
                {empleado.nombre}
              </option>
            ))}
          </SelectField>
        )}

        <TextField
          label="Monto"
          type="number"
          iconLeft={<CurrencyIcon />}
          value={form.monto}
          onChange={(event) => setField("monto", event.target.value)}
        />

        <TextField
          label="Observaciones"
          iconLeft={<SearchIcon />}
          value={form.observaciones}
          onChange={(event) => setField("observaciones", event.target.value)}
        />
      </div>
    </Modal>
  );
}
