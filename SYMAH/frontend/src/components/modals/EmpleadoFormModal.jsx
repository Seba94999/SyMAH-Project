import { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import Button from "../ui/Button.jsx";
import TextField from "../forms/TextField.jsx";
import SelectField from "../forms/SelectField.jsx";
import {
  CheckIcon,
  BriefcaseIcon,
  BuildingIcon,
  CalendarPlusIcon,
  CurrencyIcon,
  SearchIcon,
  TagIcon,
  UserIcon,
  XIcon,
} from "../ui/Icon.jsx";

const JORNADA_OPTIONS = [
  { value: "Completa", label: "Completa" },
  { value: "Parcial", label: "Parcial" },
  { value: "Turnos", label: "Turnos" },
];

const ESTADO_OPTIONS = [
  { value: "activo", label: "Activo" },
  { value: "inactivo", label: "Inactivo" },
];

export default function EmpleadoFormModal({
  open,
  initial = null,
  onClose,
  onSubmit,
  submitting = false,
}) {
  const [form, setForm] = useState({
    nombre: initial?.nombre || "",
    cargo: initial?.cargo || "",
    sede: initial?.sede || "",
    estado: initial?.estado || "activo",
    jornada: initial?.jornada || "Completa",
    salario: initial?.salario?.toString() || "",
    horasMes: initial?.horasMes?.toString() || "",
    ultimaActividad: initial?.ultimaActividad || "",
  });

  useEffect(() => {
    setForm({
      nombre: initial?.nombre || "",
      cargo: initial?.cargo || "",
      sede: initial?.sede || "",
      estado: initial?.estado || "activo",
      jornada: initial?.jornada || "Completa",
      salario: initial?.salario?.toString() || "",
      horasMes: initial?.horasMes?.toString() || "",
      ultimaActividad: initial?.ultimaActividad || "",
    });
  }, [initial, open]);

  function setField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit() {
    onSubmit({
      ...form,
      salario: Number(form.salario),
      horasMes: Number(form.horasMes),
    });
  }

  return (
    <Modal
      open={open}
      title={initial ? "Editar empleado" : "Nuevo empleado"}
      icon={<UserIcon />}
      subtitle="Datos laborales esenciales con una presentación más limpia."
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
          iconLeft={<UserIcon />}
          value={form.nombre}
          onChange={(event) => setField("nombre", event.target.value)}
        />
        <TextField
          label="Cargo"
          iconLeft={<SearchIcon />}
          value={form.cargo}
          onChange={(event) => setField("cargo", event.target.value)}
        />
        <TextField
          label="Sede"
          iconLeft={<BuildingIcon />}
          value={form.sede}
          onChange={(event) => setField("sede", event.target.value)}
        />
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
          label="Jornada"
          iconLeft={<CalendarPlusIcon />}
          value={form.jornada}
          onChange={(event) => setField("jornada", event.target.value)}
        >
          {JORNADA_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
        <div className="sy-form-grid sy-form-grid--2">
          <TextField
            label="Salario"
            type="number"
            iconLeft={<CurrencyIcon />}
            value={form.salario}
            onChange={(event) => setField("salario", event.target.value)}
          />
          <TextField
            label="Horas mes"
            type="number"
            iconLeft={<CalendarPlusIcon />}
            value={form.horasMes}
            onChange={(event) => setField("horasMes", event.target.value)}
          />
        </div>
        <TextField
          label="Última actividad"
          iconLeft={<CalendarPlusIcon />}
          value={form.ultimaActividad}
          onChange={(event) => setField("ultimaActividad", event.target.value)}
        />
      </div>
    </Modal>
  );
}
