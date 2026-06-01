import { DataTable } from "../Tables.jsx";
import Button from "../ui/Button.jsx";
import SelectField from "../forms/SelectField.jsx";
import Modal from "./Modal.jsx";

export default function EmpleadoDetailModal({
  open,
  empleado,
  jornadas = [],
  jornadasLoading = false,
  jornadasColumns,
  filtroMes = "todos",
  filtroAnio = "todos",
  mesesOptions = [],
  aniosOptions = [],
  onFiltroMesChange,
  onFiltroAnioChange,
  onClose,
  onNewJornada,
}) {
  if (!empleado) {
    return null;
  }

  return (
    <Modal
      open={open}
      title={`Jornadas de ${empleado.nombre}`}
      onClose={onClose}
    >
      <div className="sy-stack">
        <section className="sy-section">
          <header className="sy-section__header">
            <strong className="sy-section__title">Jornadas registradas</strong>
            <Button variant="primary" onClick={onNewJornada}>
              Nueva jornada
            </Button>
          </header>

          <p className="sy-page__description">
            Desde aquí puedes registrar, editar o eliminar las jornadas del
            empleado seleccionado.
          </p>

          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <SelectField
              label="Mes"
              value={filtroMes}
              onChange={(event) => onFiltroMesChange?.(event.target.value)}
            >
              {mesesOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectField>
            <SelectField
              label="Año"
              value={filtroAnio}
              onChange={(event) => onFiltroAnioChange?.(event.target.value)}
            >
              <option value="todos">Todos</option>
              {aniosOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectField>
          </div>

          {jornadasColumns ? (
            <DataTable
              columns={jornadasColumns}
              data={jornadas}
              loading={jornadasLoading}
              emptyTitle="Sin jornadas"
              emptyDescription="No existen jornadas registradas para este empleado."
            />
          ) : null}
        </section>
      </div>
    </Modal>
  );
}
