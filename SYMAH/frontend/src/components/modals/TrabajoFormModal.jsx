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

export default function TrabajoFormModal({
  open,
  initial = null,
  onClose,
  onSubmit,
  submitting = false,
}) {
  const [form, setForm] = useState({
    nombre: initial?.nombre || "",
    cliente: initial?.cliente || "",
    responsable: initial?.responsable || "",
    estado: initial?.estado || "enCurso",
    prioridad: initial?.prioridad || "Media",
    progreso: initial?.progreso?.toString() || "0",
    monto: initial?.monto?.toString() || "0",
    ultimaActualizacion: initial?.ultimaActualizacion || "",
  });

  useEffect(() => {
    setForm({
      nombre: initial?.nombre || "",
      cliente: initial?.cliente || "",
      responsable: initial?.responsable || "",
      estado: initial?.estado || "enCurso",
      prioridad: initial?.prioridad || "Media",
      progreso: initial?.progreso?.toString() || "0",
      monto: initial?.monto?.toString() || "0",
      ultimaActualizacion: initial?.ultimaActualizacion || "",
    });
  }, [initial, open]);

  function setField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit() {
    onSubmit({
      ...form,
      progreso: Number(form.progreso || 0),
      monto: Number(form.monto || 0),
    });
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
        <TextField
          label="Cliente"
          iconLeft={<UserIcon />}
          value={form.cliente}
          onChange={(event) => setField("cliente", event.target.value)}
        />
        <TextField
          label="Responsable"
          iconLeft={<UserIcon />}
          value={form.responsable}
          onChange={(event) => setField("responsable", event.target.value)}
        />
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
            label="Progreso (%)"
            type="number"
            min="0"
            max="100"
            iconLeft={<PercentIcon />}
            value={form.progreso}
            onChange={(event) => setField("progreso", event.target.value)}
          />
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
