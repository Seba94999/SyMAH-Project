import { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import Button from "../ui/Button.jsx";
import TextField from "../forms/TextField.jsx";
import TextAreaField from "../forms/TextAreaField.jsx";
import SelectField from "../forms/SelectField.jsx";
import { CheckIcon, ClockIcon, SearchIcon, XIcon } from "../ui/Icon.jsx";

export default function JornadaFormModal({
  open,
  initial = null,
  trabajosOptions = [],
  onClose,
  onSubmit,
  submitting = false,
}) {
  const [form, setForm] = useState({
    empleadoId: initial?.empleadoId || "",
    trabajoId: initial?.trabajoId || "",
    fecha: initial?.fecha || "",
    inicio: initial?.inicio || "",
    fin: initial?.fin || "",
    notas: initial?.notas || "",
  });

  useEffect(() => {
    setForm({
      empleadoId: initial?.empleadoId || "",
      trabajoId: initial?.trabajoId || "",
      fecha: initial?.fecha || "",
      inicio: initial?.inicio || "",
      fin: initial?.fin || "",
      notas: initial?.notas || "",
    });
  }, [initial, open]);

  function setField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  return (
    <Modal
      open={open}
      title={initial ? "Editar jornada" : "Nueva jornada"}
      icon={<ClockIcon />}
      subtitle="Registro de horario con una presentación sobria y alineada."
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
            onClick={() => onSubmit(form)}
            iconLeft={<CheckIcon />}
          >
            {initial ? "Guardar" : "Crear"}
          </Button>
        </>
      }
    >
      <div className="sy-stack">
        <SelectField
          label="Trabajo"
          iconLeft={<SearchIcon />}
          value={form.trabajoId}
          onChange={(e) => setField("trabajoId", e.target.value)}
        >
          <option value="">Selecciona un trabajo</option>
          {trabajosOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>

        <TextField
          label="Fecha"
          type="date"
          iconLeft={<ClockIcon />}
          value={form.fecha}
          onChange={(e) => setField("fecha", e.target.value)}
        />

        <div className="sy-form-grid sy-form-grid--2">
          <TextField
            label="Inicio"
            type="time"
            iconLeft={<ClockIcon />}
            value={form.inicio}
            onChange={(e) => setField("inicio", e.target.value)}
          />
          <TextField
            label="Fin"
            type="time"
            iconLeft={<ClockIcon />}
            value={form.fin}
            onChange={(e) => setField("fin", e.target.value)}
          />
        </div>

        <TextAreaField
          label="Notas"
          iconLeft={<SearchIcon />}
          value={form.notas}
          onChange={(e) => setField("notas", e.target.value)}
        />
      </div>
    </Modal>
  );
}
