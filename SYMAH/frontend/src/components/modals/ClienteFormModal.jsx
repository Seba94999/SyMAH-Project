import { useEffect, useState } from "react";
import Button from "../ui/Button.jsx";
import TextField from "../forms/TextField.jsx";
import SelectField from "../forms/SelectField.jsx";
import Modal from "./Modal.jsx";
import {
  BuildingIcon,
  CheckIcon,
  CurrencyIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TagIcon,
  SearchIcon,
  XIcon,
  UserIcon,
} from "../ui/Icon.jsx";

const ESTADO_OPTIONS = [
  { value: "activo", label: "Activo" },
  { value: "enRiesgo", label: "En riesgo" },
  { value: "inactivo", label: "Inactivo" },
];

export default function ClienteFormModal({
  open,
  initial = null,
  onClose,
  onSubmit,
  submitting = false,
}) {
  const [form, setForm] = useState({
    nombre: initial?.nombre || "",
    rubro: initial?.rubro || "",
    ciudad: initial?.ciudad || "",
    estado: initial?.estado || "activo",
    contacto: initial?.contacto || "",
    correo: initial?.correo || "",
    telefono: initial?.telefono || "",
    ultimoTrabajo: initial?.ultimoTrabajo || "",
    balancePendiente: initial?.balancePendiente?.toString() || "0",
  });

  useEffect(() => {
    setForm({
      nombre: initial?.nombre || "",
      rubro: initial?.rubro || "",
      ciudad: initial?.ciudad || "",
      estado: initial?.estado || "activo",
      contacto: initial?.contacto || "",
      correo: initial?.correo || "",
      telefono: initial?.telefono || "",
      ultimoTrabajo: initial?.ultimoTrabajo || "",
      balancePendiente: initial?.balancePendiente?.toString() || "0",
    });
  }, [initial, open]);

  function setField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit() {
    onSubmit({
      ...form,
      balancePendiente: Number(form.balancePendiente || 0),
    });
  }

  return (
    <Modal
      open={open}
      title={initial ? "Editar cliente" : "Nuevo cliente"}
      icon={<UserIcon />}
      subtitle="Datos esenciales del cliente en una vista limpia y directa."
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
          label="Rubro"
          iconLeft={<SearchIcon />}
          value={form.rubro}
          onChange={(event) => setField("rubro", event.target.value)}
        />
        <div className="sy-form-grid sy-form-grid--2">
          <TextField
            label="Ciudad"
            iconLeft={<MapPinIcon />}
            value={form.ciudad}
            onChange={(event) => setField("ciudad", event.target.value)}
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
        </div>
        <TextField
          label="Contacto"
          iconLeft={<UserIcon />}
          value={form.contacto}
          onChange={(event) => setField("contacto", event.target.value)}
        />
        <TextField
          label="Correo"
          type="email"
          iconLeft={<MailIcon />}
          value={form.correo}
          onChange={(event) => setField("correo", event.target.value)}
        />
        <div className="sy-form-grid sy-form-grid--2">
          <TextField
            label="Teléfono"
            iconLeft={<PhoneIcon />}
            value={form.telefono}
            onChange={(event) => setField("telefono", event.target.value)}
          />
          <TextField
            label="Saldo pendiente"
            type="number"
            iconLeft={<CurrencyIcon />}
            value={form.balancePendiente}
            onChange={(event) =>
              setField("balancePendiente", event.target.value)
            }
          />
        </div>
        <TextField
          label="Último trabajo"
          iconLeft={<SearchIcon />}
          value={form.ultimoTrabajo}
          onChange={(event) => setField("ultimoTrabajo", event.target.value)}
        />
      </div>
    </Modal>
  );
}
