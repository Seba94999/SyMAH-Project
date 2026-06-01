import { useMemo, useState } from "react";
import { Badge, Card, EmptyState } from "../../components/Ui.jsx";
import { DataTable, TableFilters } from "../../components/Tables.jsx";
import { SummaryCard, MetricsGrid } from "../../components/Dashboard.jsx";
import {
  EMPLEADOS_STATUS,
  formatCurrency,
  obtenerVarianteEmpleadoEstado,
} from "../../services/EmpleadosService.jsx";
import useEmpleados from "../../hooks/useEmpleados.jsx";
import useJornadas from "../../hooks/useJornadas.jsx";
import EmpleadoFormModal from "../../components/modals/EmpleadoFormModal.jsx";
import EmpleadoDetailModal from "../../components/modals/EmpleadoDetailModal.jsx";
import JornadaFormModal from "../../components/modals/JornadaFormModal.jsx";
import ConfirmModal from "../../components/modals/ConfirmModal.jsx";
import Button from "../../components/ui/Button.jsx";
import { PencilIcon, TrashIcon } from "../../components/Ui.jsx";

const COLUMNAS_EMPLEADOS = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Empleado" },
  { key: "cargo", label: "Cargo" },
  { key: "sede", label: "Sede" },
  {
    key: "estado",
    label: "Estado",
    render: (empleado) => (
      <Badge variant={obtenerVarianteEmpleadoEstado(empleado.estado)}>
        {EMPLEADOS_STATUS[empleado.estado]}
      </Badge>
    ),
  },
  {
    key: "salario",
    label: "Salario",
    align: "right",
    render: (empleado) => formatCurrency(empleado.salario),
  },
];

function createJornadasColumns(onEdit, onDelete) {
  return [
    { key: "id", label: "ID" },
    {
      key: "trabajoId",
      label: "Trabajo",
      render: (jornada) => jornada.trabajoId,
    },
    { key: "fecha", label: "Fecha" },
    { key: "inicio", label: "Inicio" },
    { key: "fin", label: "Fin" },
    { key: "duracionHoras", label: "Horas", align: "right" },
    { key: "notas", label: "Notas" },
    {
      key: "actions",
      label: "",
      render: (jornada) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            variant="secondary"
            onClick={() => onEdit(jornada)}
            iconLeft={<PencilIcon />}
            ariaLabel={`Editar jornada ${jornada.id}`}
          ></Button>
          <Button
            variant="danger"
            onClick={() => onDelete(jornada)}
            iconLeft={<TrashIcon />}
            ariaLabel={`Eliminar jornada ${jornada.id}`}
          ></Button>
        </div>
      ),
    },
  ];
}

export default function EmpleadosPage() {
  const {
    loading: empleadosLoading,
    empleadosFiltrados,
    resumen,
    busqueda,
    setBusqueda,
    filtroEstado,
    setFiltroEstado,
    create: crearEmpleado,
    update: actualizarEmpleado,
    remove: eliminarEmpleado,
  } = useEmpleados();

  const [empleadoSeleccionadoId, setEmpleadoSeleccionadoId] = useState(null);
  const [openEmpleadoForm, setOpenEmpleadoForm] = useState(false);
  const [editingEmpleado, setEditingEmpleado] = useState(null);
  const [openConfirmEmpleado, setOpenConfirmEmpleado] = useState(false);
  const [empleadoAEliminarId, setEmpleadoAEliminarId] = useState(null);

  const empleadoSeleccionado =
    empleadosFiltrados.find(
      (empleado) => empleado.id === empleadoSeleccionadoId,
    ) ||
    empleadosFiltrados[0] ||
    null;

  const {
    jornadasFiltradas,
    loading: jornadasLoading,
    filtroMes,
    setFiltroMes,
    filtroAnio,
    setFiltroAnio,
    mesesDisponibles,
    aniosDisponibles,
    create: crearJornada,
    update: actualizarJornada,
    remove: eliminarJornada,
    trabajosOptions,
  } = useJornadas(empleadoSeleccionado?.id);

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const modalOpen =
    openEmpleadoForm ||
    openConfirmEmpleado ||
    openDetail ||
    openForm ||
    openConfirm;

  const jornadasColumns = useMemo(
    () =>
      createJornadasColumns(
        (jornada) => {
          setEditing(jornada);
          setOpenForm(true);
        },
        (jornada) => {
          setToDeleteId(jornada.id);
          setOpenConfirm(true);
        },
      ),
    [],
  );

  async function handleSubmitEmpleado(payload) {
    if (editingEmpleado) {
      await actualizarEmpleado(editingEmpleado.id, payload);
      setEmpleadoSeleccionadoId(editingEmpleado.id);
    } else {
      const created = await crearEmpleado(payload);
      setEmpleadoSeleccionadoId(created?.id || empleadoSeleccionadoId);
    }

    setOpenEmpleadoForm(false);
    setEditingEmpleado(null);
  }

  async function handleConfirmDeleteEmpleado() {
    if (!empleadoAEliminarId) return;
    await eliminarEmpleado(empleadoAEliminarId);
    setOpenConfirmEmpleado(false);
    setEmpleadoAEliminarId(null);
  }

  async function handleSubmitJornada(payload) {
    const base = { ...payload, empleadoId: empleadoSeleccionado?.id };
    if (editing) {
      await actualizarJornada(editing.id, base);
    } else {
      await crearJornada(base);
    }
    setOpenForm(false);
    setEditing(null);
  }

  async function handleConfirmDelete() {
    if (!toDeleteId) return;
    await eliminarJornada(toDeleteId);
    setOpenConfirm(false);
    setToDeleteId(null);
  }

  return (
    <section className="sy-page">
      <header className="sy-page__header">
        <p className="sy-page__eyebrow">Recursos humanos</p>
        <h1 className="sy-page__title">Empleados</h1>
        <p className="sy-page__description">
          Controla el estado operativo, la carga laboral y la distribución de
          nómina del equipo. La card resume al empleado seleccionado, mientras
          que la tabla permite crear, editar y eliminar empleados; usa
          "Administrar jornadas" para abrir el modal de gestión de jornadas.
        </p>
      </header>

      <div
        className={`sy-page__body ${modalOpen ? "sy-page__body--blurred" : ""}`.trim()}
      >
        <MetricsGrid>
          <SummaryCard
            title="Total empleados"
            value={resumen.total}
            variant="primary"
          />
          <SummaryCard
            title="Activos"
            value={resumen.activos}
            variant="success"
          />
          <SummaryCard
            title="Inactivos"
            value={resumen.inactivos}
            variant="danger"
          />
          <SummaryCard
            title="Nómina total"
            value={formatCurrency(resumen.nominaTotal)}
            variant="warning"
          />
        </MetricsGrid>

        <section className="sy-grid sy-grid--sidebar">
          <Card className="sy-section">
            <header className="sy-section__header">
              <strong className="sy-section__title">
                Listado de empleados
              </strong>
              <Button
                variant="primary"
                onClick={() => {
                  setEditingEmpleado(null);
                  setOpenEmpleadoForm(true);
                }}
              >
                Nuevo empleado
              </Button>
            </header>

            <TableFilters
              searchValue={busqueda}
              onSearchChange={setBusqueda}
              searchPlaceholder="Buscar por nombre, cargo o sede"
              filterValue={filtroEstado}
              onFilterChange={setFiltroEstado}
              filterOptions={[
                { value: "todos", label: "Todos" },
                { value: "activo", label: "Activos" },
                { value: "inactivo", label: "Inactivos" },
              ]}
            />

            <DataTable
              columns={COLUMNAS_EMPLEADOS}
              data={empleadosFiltrados}
              selectedRowId={empleadoSeleccionado?.id}
              onRowClick={(empleado) => setEmpleadoSeleccionadoId(empleado.id)}
              emptyTitle="Sin empleados coincidentes"
              emptyDescription="No hay empleados que coincidan con los filtros aplicados."
              loading={empleadosLoading}
              renderRowActions={(empleado) => (
                <div style={{ display: "flex", gap: 8 }}>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setEmpleadoSeleccionadoId(empleado.id);
                      setEditingEmpleado(empleado);
                      setOpenEmpleadoForm(true);
                    }}
                    iconLeft={<PencilIcon />}
                    ariaLabel={`Editar empleado ${empleado.nombre}`}
                  ></Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setEmpleadoSeleccionadoId(empleado.id);
                      setEmpleadoAEliminarId(empleado.id);
                      setOpenConfirmEmpleado(true);
                    }}
                    iconLeft={<TrashIcon />}
                    ariaLabel={`Eliminar empleado ${empleado.nombre}`}
                  ></Button>
                </div>
              )}
            />
          </Card>

          <Card className="sy-section">
            <strong className="sy-section__title">Ficha del empleado</strong>

            {empleadoSeleccionado ? (
              <div className="clientes-detalle__body">
                <h2 className="sy-detail-title">
                  {empleadoSeleccionado.nombre}
                </h2>
                <p>
                  <strong>Cargo:</strong> {empleadoSeleccionado.cargo}
                </p>
                <p>
                  <strong>Sede:</strong> {empleadoSeleccionado.sede}
                </p>
                <p>
                  <strong>Jornada:</strong> {empleadoSeleccionado.jornada}
                </p>
                <p>
                  <strong>Horas mes:</strong> {empleadoSeleccionado.horasMes}
                </p>
                <p>
                  <strong>Última actividad:</strong>{" "}
                  {empleadoSeleccionado.ultimaActividad}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  <Badge
                    variant={
                      empleadoSeleccionado.estado === "activo"
                        ? "success"
                        : "danger"
                    }
                  >
                    {empleadoSeleccionado.estado === "activo"
                      ? "Activo"
                      : "Inactivo"}
                  </Badge>
                </p>
                <Button
                  variant="primary"
                  onClick={() => setOpenDetail(true)}
                  style={{ marginTop: 12 }}
                >
                  Administrar jornadas
                </Button>
              </div>
            ) : (
              <EmptyState
                title="Sin empleado seleccionado"
                description="Selecciona un empleado para ver su detalle."
              />
            )}
          </Card>
        </section>
      </div>

      <EmpleadoFormModal
        open={openEmpleadoForm}
        initial={editingEmpleado}
        onClose={() => {
          setOpenEmpleadoForm(false);
          setEditingEmpleado(null);
        }}
        onSubmit={handleSubmitEmpleado}
        submitting={empleadosLoading}
      />

      <ConfirmModal
        open={openConfirmEmpleado}
        title="Eliminar empleado"
        description="¿Seguro que deseas eliminar este empleado? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmVariant="danger"
        loading={empleadosLoading}
        onConfirm={handleConfirmDeleteEmpleado}
        onCancel={() => setOpenConfirmEmpleado(false)}
      />

      <EmpleadoDetailModal
        open={openDetail}
        empleado={empleadoSeleccionado}
        jornadas={jornadasFiltradas}
        jornadasLoading={jornadasLoading}
        jornadasColumns={jornadasColumns}
        filtroMes={filtroMes}
        filtroAnio={filtroAnio}
        mesesOptions={mesesDisponibles}
        aniosOptions={aniosDisponibles}
        onFiltroMesChange={setFiltroMes}
        onFiltroAnioChange={setFiltroAnio}
        onClose={() => setOpenDetail(false)}
        onNewJornada={() => {
          setEditing(null);
          setOpenForm(true);
        }}
      />

      <JornadaFormModal
        open={openForm}
        initial={editing}
        trabajosOptions={trabajosOptions}
        onClose={() => {
          setOpenForm(false);
          setEditing(null);
        }}
        onSubmit={handleSubmitJornada}
        submitting={jornadasLoading}
      />

      <ConfirmModal
        open={openConfirm}
        title="Eliminar jornada"
        description="¿Seguro que deseas eliminar esta jornada? Esta acción no es reversible."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmVariant="danger"
        loading={jornadasLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenConfirm(false)}
      />
    </section>
  );
}
