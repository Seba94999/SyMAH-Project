import { useEffect, useState } from "react";
import Button from "../ui/Button.jsx";
import TextField from "../forms/TextField.jsx";
import TextAreaField from "../forms/TextAreaField.jsx";
import SelectField from "../forms/SelectField.jsx";
import Modal from "./Modal.jsx";
import {
  BriefcaseIcon,
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
  { value: "pendiente", label: "Pendiente" },
  { value: "aprobado", label: "Aprobado" },
  { value: "rechazado", label: "Rechazado" },
];

export default function PresupuestoFormModal({
  open,
  initial = null,
  onClose,
  onSubmit,
  submitting = false,
}) {
  const [form, setForm] = useState({
    cliente: initial?.cliente || "",
    descripcion: initial?.descripcion || "",
    estado: initial?.estado || "pendiente",
    fecha: initial?.fecha || "",
    monto: initial?.monto?.toString() || "0",
    probabilidad: initial?.probabilidad?.toString() || "0",
    trabajoVinculado: initial?.trabajoVinculado || "",
  });

  useEffect(() => {
    setForm({
      cliente: initial?.cliente || "",
      descripcion: initial?.descripcion || "",
      estado: initial?.estado || "pendiente",
      fecha: initial?.fecha || "",
      monto: initial?.monto?.toString() || "0",
      probabilidad: initial?.probabilidad?.toString() || "0",
      trabajoVinculado: initial?.trabajoVinculado || "",
    });
  }, [initial, open]);

  function setField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit() {
    onSubmit({
      ...form,
      monto: Number(form.monto || 0),
      probabilidad: Number(form.probabilidad || 0),
      trabajoVinculado: form.trabajoVinculado || null,
    });
  }

  return (
    <Modal
      open={open}
      title={initial ? "Editar presupuesto" : "Nuevo presupuesto"}
      icon={<TagIcon />}
      subtitle="Cotización comercial presentada de forma limpia y precisa."
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
          label="Cliente"
          iconLeft={<UserIcon />}
          value={form.cliente}
          onChange={(event) => setField("cliente", event.target.value)}
        />
        <TextAreaField
          label="Descripción"
          iconLeft={<SearchIcon />}
          value={form.descripcion}
          onChange={(event) => setField("descripcion", event.target.value)}
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
          <TextField
            label="Fecha"
            type="date"
            iconLeft={<CalendarIcon />}
            value={form.fecha}
            onChange={(event) => setField("fecha", event.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <TextField
            label="Monto"
            type="number"
            iconLeft={<CurrencyIcon />}
            value={form.monto}
            onChange={(event) => setField("monto", event.target.value)}
          />
          <TextField
            label="Probabilidad (%)"
            type="number"
            min="0"
            max="100"
            iconLeft={<PercentIcon />}
            value={form.probabilidad}
            onChange={(event) => setField("probabilidad", event.target.value)}
          />
        </div>
        <TextField
          label="Trabajo vinculado"
          placeholder="Ej: TR-001"
          iconLeft={<SearchIcon />}
          value={form.trabajoVinculado || ""}
          onChange={(event) => setField("trabajoVinculado", event.target.value)}
        />
      </div>
    </Modal>
  );
}
