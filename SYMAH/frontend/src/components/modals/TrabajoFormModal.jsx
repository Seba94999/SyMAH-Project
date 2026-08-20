import { useEffect, useState } from "react";
import Button from "../ui/Button.jsx";
import TextField from "../forms/TextField.jsx";
import SelectField from "../forms/SelectField.jsx";
import Modal from "./Modal.jsx";
import {
  BriefcaseIcon,
  BuildingIcon,
  CalendarIcon,
  CheckIcon,
  CurrencyIcon,
  PercentIcon,
  SearchIcon,
  TagIcon,
  UserIcon,
  XIcon,
} from "../ui/Icon.jsx";
import useClientes from "../../hooks/useClientes.jsx";
import useEmpleados from "../../hooks/useEmpleados.jsx";

const ESTADO_OPTIONS = [
  { value: "enCurso", label: "En curso" },
  { value: "enPausa", label: "En pausa" },
  { value: "finalizado", label: "Finalizado" },
  { value: "cancelado", label: "Cancelado" },
];

const PRIORIDAD_OPTIONS = [
  { value: "Alta", label: "Alta" },
  { value: "Media", label: "Media" },
  { value: "Baja", label: "Baja" },
];

function buildFormState(initial) {
  return {
    nombre: initial?.nombre || "",

    clienteId:
      initial?.clienteId ||
      initial?.cliente?.id ||
      initial?.cliente?.codigo ||
      "",

    responsableId:
      initial?.responsableId ||
      initial?.responsable?.id ||
      initial?.responsable?.codigo ||
      "",

    estado: initial?.estado || "enCurso",

    prioridad: initial?.prioridad || "Media",

    monto: initial?.monto?.toString() || "0",

    ultimaActualizacion: initial?.ultimaActualizacion || "",
  };
}

export default function TrabajoFormModal({
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

  const { clientes = [], loading: clientesLoading } = useClientes();

  const { empleados = [], loading: empleadosLoading } = useEmpleados();

  function setField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit() {
    const data = {
      ...form,
      monto: Number(form.monto || 0),
    };

    console.log("FORMULARIO ENVIADO:", data);

    onSubmit(data);
  }

  return (
    <Modal
      open={open}
      title={initial ? "Editar trabajo" : "Nuevo trabajo"}
      icon={<BriefcaseIcon />}
      subtitle="Seguimiento operativo con un estilo más sobrio y ordenado."
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
        <TextField
          label="Nombre"
          iconLeft={<SearchIcon />}
          value={form.nombre}
          onChange={(event) => setField("nombre", event.target.value)}
        />

        <SelectField
          label="Cliente"
          iconLeft={<BuildingIcon />}
          value={form.clienteId}
          onChange={(event) => setField("clienteId", event.target.value)}
          disabled={clientesLoading}
        >
          <option value="">
            {clientesLoading ? "Cargando clientes..." : "Seleccionar cliente"}
          </option>

          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {`${cliente.nombre} — ${cliente.id}`}
            </option>
          ))}
        </SelectField>

        <SelectField
          label="Responsable"
          iconLeft={<UserIcon />}
          value={form.responsableId}
          onChange={(event) => setField("responsableId", event.target.value)}
          disabled={empleadosLoading}
        >
          <option value="">
            {empleadosLoading
              ? "Cargando responsables..."
              : "Seleccionar responsable"}
          </option>

          {empleados.map((empleado) => (
            <option key={empleado.id} value={empleado.id}>
              {`${empleado.nombre} — ${empleado.id}`}
            </option>
          ))}
        </SelectField>

        <div className="sy-form-grid sy-form-grid--2">
          <SelectField
            label="Estado"
            iconLeft={<TagIcon />}
            value={form.estado}
            onChange={(event) => setField("estado", event.target.value)}
          >
            {ESTADO_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>

          <SelectField
            label="Prioridad"
            iconLeft={<TagIcon />}
            value={form.prioridad}
            onChange={(event) => setField("prioridad", event.target.value)}
          >
            {PRIORIDAD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
        </div>

        <div className="sy-form-grid sy-form-grid--2">
          <TextField
            label="Monto"
            type="number"
            iconLeft={<CurrencyIcon />}
            value={form.monto}
            onChange={(event) => setField("monto", event.target.value)}
          />
        </div>

        <TextField
          label="Última actualización"
          type="date"
          iconLeft={<CalendarIcon />}
          value={form.ultimaActualizacion}
          onChange={(event) =>
            setField("ultimaActualizacion", event.target.value)
          }
        />
      </div>
    </Modal>
  );
}
