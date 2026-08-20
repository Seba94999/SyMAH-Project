import { useEffect, useState } from "react";
import Button from "../ui/Button.jsx";
import TextField from "../forms/TextField.jsx";
import TextAreaField from "../forms/TextAreaField.jsx";
import SelectField from "../forms/SelectField.jsx";
import Modal from "./Modal.jsx";
import {
  CalendarIcon,
  CheckIcon,
  CurrencyIcon,
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
  clientesRegistrados = [],
  onClose,
  onSubmit,
  submitting = false,
}) {
  const tieneClientesRegistrados = clientesRegistrados.length > 0;
  const [presupuestoFileName, setPresupuestoFileName] = useState("");
  const [clienteError, setClienteError] = useState("");
  const [clienteModo, setClienteModo] = useState(
    tieneClientesRegistrados ? "registrado" : "nuevo",
  );
  const [clienteRegistrado, setClienteRegistrado] = useState("");
  const [clienteNuevo, setClienteNuevo] = useState("");
  const [form, setForm] = useState({
    descripcion: initial?.descripcion || "",
    estado: initial?.estado || "pendiente",
    fecha: initial?.fecha || "",
    monto: initial?.monto?.toString() || "0",
    trabajoVinculado: initial?.trabajoVinculado || "",
    presupuesto: initial?.presupuesto || "",
  });

  useEffect(() => {
    const clienteInicial = initial?.cliente || "";
    const coincideConRegistrado = clientesRegistrados.some(
      (cliente) => cliente.nombre === clienteInicial,
    );
    const clienteInicialRegistrado = initial
      ? (initial.clienteRegistrado ?? coincideConRegistrado)
      : tieneClientesRegistrados;

    setForm({
      descripcion: initial?.descripcion || "",
      estado: initial?.estado || "pendiente",
      fecha: initial?.fecha || "",
      monto: initial?.monto?.toString() || "0",
      trabajoVinculado: initial?.trabajoVinculado || "",
      presupuesto: initial?.presupuesto || "",
    });
    setClienteModo(
      clienteInicialRegistrado && tieneClientesRegistrados
        ? "registrado"
        : "nuevo",
    );
    setClienteRegistrado(clienteInicialRegistrado ? clienteInicial : "");
    setClienteNuevo(clienteInicialRegistrado ? "" : clienteInicial);
    setClienteError("");
    setPresupuestoFileName(initial?.presupuestoName || "");
  }, [initial, open]);

  function setField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleClienteSelection(event) {
    const value = event.target.value;

    setClienteError("");

    if (value === "__nuevo__") {
      setClienteModo("nuevo");
      return;
    }

    setClienteModo("registrado");
    setClienteRegistrado(value);
  }

  function handleSubmit() {
    const cliente =
      clienteModo === "registrado"
        ? clienteRegistrado.trim()
        : clienteNuevo.trim();

    if (cliente.length === 0) {
      setClienteError(
        clienteModo === "registrado"
          ? "Selecciona un cliente registrado o elige cliente nuevo."
          : "Escribe el nombre del cliente.",
      );
      return;
    }

    setClienteError("");

    onSubmit({
      cliente,
      clienteRegistrado: clienteModo === "registrado",
      descripcion: form.descripcion,
      estado: form.estado,
      fecha: form.fecha,
      monto: Number(form.monto || 0),
      trabajoVinculado: form.trabajoVinculado || null,
      presupuesto: form.presupuesto || null,
      presupuestoName: presupuestoFileName || null,
    });
  }

  function handlePdfChange(event) {
    const file = event.target.files?.[0] || null;

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPresupuestoFileName(file.name);
      setField(
        "presupuesto",
        typeof reader.result === "string" ? reader.result : "",
      );
    };
    reader.readAsDataURL(file);
  }

  return (
    <Modal
      open={open}
      title={initial ? "Editar presupuesto" : "Nuevo presupuesto"}
      icon={<TagIcon />}
      subtitle="Cotización comercial preparada para su seguimiento hasta convertirse en trabajo."
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
        <SelectField
          label="Cliente asociado"
          iconLeft={<UserIcon />}
          value={clienteModo === "nuevo" ? "__nuevo__" : clienteRegistrado}
          onChange={handleClienteSelection}
          hint={
            tieneClientesRegistrados
              ? "Selecciona un cliente existente o elige ingresar un cliente nuevo."
              : "No hay clientes registrados todavía, por lo que debes ingresar uno nuevo."
          }
          error={clienteModo === "registrado" ? clienteError : ""}
        >
          {tieneClientesRegistrados ? (
            <>
              <option value="">Selecciona un cliente registrado</option>
              {clientesRegistrados.map((cliente) => (
                <option key={cliente.id} value={cliente.nombre}>
                  {cliente.nombre}
                </option>
              ))}
            </>
          ) : null}
          <option value="__nuevo__">Ingresar cliente nuevo</option>
        </SelectField>

        {clienteModo === "nuevo" ? (
          <TextField
            label="Nombre del cliente nuevo"
            iconLeft={<UserIcon />}
            value={clienteNuevo}
            onChange={(event) => {
              setClienteNuevo(event.target.value);
              if (clienteError) {
                setClienteError("");
              }
            }}
            hint="El presupuesto quedará con registro de cliente pendiente."
            error={clienteModo === "nuevo" ? clienteError : ""}
          />
        ) : null}

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

        <TextField
          label="Monto"
          type="number"
          iconLeft={<CurrencyIcon />}
          value={form.monto}
          onChange={(event) => setField("monto", event.target.value)}
        />

        <TextField
          label="Trabajo vinculado"
          placeholder="Ej: TR-001"
          iconLeft={<SearchIcon />}
          value={form.trabajoVinculado || ""}
          onChange={(event) => setField("trabajoVinculado", event.target.value)}
        />

        <div className="sy-stack" style={{ gap: 8 }}>
          <label className="sy-form-label" htmlFor="presupuesto-pdf">
            Presupuesto PDF
          </label>
          <input
            id="presupuesto-pdf"
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
          />
          <small className="sy-form-hint">
            Opcional. Si no se carga ahora, se podrá consultar desde la ficha
            del presupuesto cuando esté disponible.
          </small>
          {presupuestoFileName ? (
            <small className="sy-form-hint">
              Archivo actual: {presupuestoFileName}
            </small>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
