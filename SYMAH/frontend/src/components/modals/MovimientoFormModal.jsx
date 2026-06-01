import { useEffect, useState } from "react";
import Button from "../ui/Button.jsx";
import TextField from "../forms/TextField.jsx";
import SelectField from "../forms/SelectField.jsx";
import Modal from "./Modal.jsx";
import { FINANZAS_TIPOS } from "../../services/FinanzasService.jsx";
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

export default function MovimientoFormModal({
  open,
  initial = null,
  onClose,
  onSubmit,
  submitting = false,
}) {
  const [form, setForm] = useState({
    tipo: initial?.tipo || "ingreso",
    concepto: initial?.concepto || "",
    referencia: initial?.referencia || "",
    fecha: initial?.fecha || "",
    monto: initial?.monto?.toString() || "0",
  });

  useEffect(() => {
    setForm({
      tipo: initial?.tipo || "ingreso",
      concepto: initial?.concepto || "",
      referencia: initial?.referencia || "",
      fecha: initial?.fecha || "",
      monto: initial?.monto?.toString() || "0",
    });
  }, [initial, open]);

  function setField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit() {
    onSubmit({
      ...form,
      monto: Number(form.monto || 0),
    });
  }

  return (
    <Modal
      open={open}
      title={initial ? "Editar movimiento" : "Nuevo movimiento"}
      icon={<CurrencyIcon />}
      subtitle="Movimiento financiero con una estructura clara y ligera."
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
        <TextField
          label="Referencia"
          placeholder="Ej: TR-001"
          iconLeft={<TagIcon />}
          value={form.referencia}
          onChange={(event) => setField("referencia", event.target.value)}
        />
        <TextField
          label="Monto"
          type="number"
          iconLeft={<CurrencyIcon />}
          value={form.monto}
          onChange={(event) => setField("monto", event.target.value)}
        />
      </div>
    </Modal>
  );
}
