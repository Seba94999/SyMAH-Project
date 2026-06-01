import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "../../components/Ui.jsx";
import { DataTable, TableFilters } from "../../components/Tables.jsx";
import { MetricsGrid, SummaryCard } from "../../components/Dashboard.jsx";
import {
  PRESUPUESTOS_STATUS,
  formatCurrency,
  obtenerVariantePresupuestoEstado,
} from "../../services/PresupuestosService.jsx";
import ConfirmModal from "../../components/modals/ConfirmModal.jsx";
import PresupuestoFormModal from "../../components/modals/PresupuestoFormModal.jsx";
import usePresupuestos from "../../hooks/usePresupuestos.jsx";

const COLUMNAS_PRESUPUESTOS = [
  { key: "id", label: "ID" },
  { key: "cliente", label: "Cliente" },
  { key: "descripcion", label: "Descripción" },
  {
    key: "estado",
    label: "Estado",
    render: (presupuesto) => (
      <Badge variant={obtenerVariantePresupuestoEstado(presupuesto.estado)}>
        {PRESUPUESTOS_STATUS[presupuesto.estado]}
      </Badge>
    ),
  },
  {
    key: "monto",
    label: "Monto",
    align: "right",
    render: (presupuesto) => formatCurrency(presupuesto.monto),
  },
];

export default function PresupuestosPage() {
  const {
    loading,
    presupuestosFiltrados,
    resumen,
    busqueda,
    setBusqueda,
    filtroEstado,
    setFiltroEstado,
    create,
    update,
    remove,
  } = usePresupuestos();

  const [presupuestoSeleccionadoId, setPresupuestoSeleccionadoId] =
    useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingPresupuesto, setEditingPresupuesto] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [presupuestoAEliminarId, setPresupuestoAEliminarId] = useState(null);
  const modalOpen = openForm || openConfirm;

  const presupuestoSeleccionado =
    presupuestosFiltrados.find(
      (item) => item.id === presupuestoSeleccionadoId,
    ) ||
    presupuestosFiltrados[0] ||
    null;

  return (
    <section className="sy-page">
      <header className="sy-page__header">
        <p className="sy-page__eyebrow">Comercial</p>
        <h1 className="sy-page__title">Presupuestos</h1>
        <p className="sy-page__description">
          Administra el ciclo comercial y visualiza qué presupuestos están
          listos para convertirse en trabajo.
        </p>
      </header>

      <div
        className={`sy-page__body ${modalOpen ? "sy-page__body--blurred" : ""}`.trim()}
      >
        <MetricsGrid>
          <SummaryCard
            title="Total presupuestos"
            value={resumen.total}
            variant="primary"
          />
          <SummaryCard
            title="Aprobados"
            value={resumen.aprobados}
            variant="success"
          />
          <SummaryCard
            title="Pendientes"
            value={resumen.pendientes}
            variant="warning"
          />
          <SummaryCard
            title="Monto total"
            value={formatCurrency(resumen.montoTotal)}
            variant="primary"
          />
        </MetricsGrid>

        <section className="sy-grid sy-grid--sidebar">
          <Card className="sy-section">
            <header className="sy-section__header">
              <strong className="sy-section__title">
                Listado de presupuestos
              </strong>
              <Button
                variant="primary"
                onClick={() => {
                  setEditingPresupuesto(null);
                  setOpenForm(true);
                }}
                iconLeft={<PlusIcon />}
              >
                Nuevo presupuesto
              </Button>
            </header>

            <TableFilters
              searchValue={busqueda}
              onSearchChange={setBusqueda}
              searchPlaceholder="Buscar por cliente, ID o descripción"
              filterValue={filtroEstado}
              onFilterChange={setFiltroEstado}
              filterOptions={[
                { value: "todos", label: "Todos" },
                { value: "pendiente", label: "Pendientes" },
                { value: "aprobado", label: "Aprobados" },
                { value: "rechazado", label: "Rechazados" },
              ]}
            />

            <DataTable
              columns={COLUMNAS_PRESUPUESTOS}
              data={presupuestosFiltrados}
              loading={loading}
              selectedRowId={presupuestoSeleccionado?.id}
              onRowClick={(presupuesto) =>
                setPresupuestoSeleccionadoId(presupuesto.id)
              }
              emptyTitle="Sin presupuestos coincidentes"
              emptyDescription="No hay presupuestos que coincidan con la búsqueda y filtro aplicados."
              renderRowActions={(presupuesto) => (
                <div style={{ display: "flex", gap: 8 }}>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setPresupuestoSeleccionadoId(presupuesto.id);
                      setEditingPresupuesto(presupuesto);
                      setOpenForm(true);
                    }}
                    iconLeft={<PencilIcon />}
                    ariaLabel={`Editar presupuesto ${presupuesto.id}`}
                  ></Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setPresupuestoSeleccionadoId(presupuesto.id);
                      setPresupuestoAEliminarId(presupuesto.id);
                      setOpenConfirm(true);
                    }}
                    iconLeft={<TrashIcon />}
                    ariaLabel={`Eliminar presupuesto ${presupuesto.id}`}
                  ></Button>
                </div>
              )}
            />
          </Card>

          <Card className="sy-section">
            <strong className="sy-section__title">Ficha del presupuesto</strong>

            {presupuestoSeleccionado ? (
              <div className="clientes-detalle__body">
                <h2 className="sy-detail-title">
                  {presupuestoSeleccionado.cliente}
                </h2>
                <p>
                  <strong>Descripción:</strong>{" "}
                  {presupuestoSeleccionado.descripcion}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  {PRESUPUESTOS_STATUS[presupuestoSeleccionado.estado]}
                </p>
                <p>
                  <strong>Fecha:</strong> {presupuestoSeleccionado.fecha}
                </p>
                <p>
                  <strong>Probabilidad:</strong>{" "}
                  {presupuestoSeleccionado.probabilidad}%
                </p>
                <p>
                  <strong>Trabajo vinculado:</strong>{" "}
                  {presupuestoSeleccionado.trabajoVinculado || "Sin vincular"}
                </p>
              </div>
            ) : (
              <EmptyState
                title="Sin presupuesto seleccionado"
                description="Selecciona un presupuesto para ver su detalle."
              />
            )}
          </Card>
        </section>
      </div>

      <PresupuestoFormModal
        open={openForm}
        initial={editingPresupuesto}
        onClose={() => {
          setOpenForm(false);
          setEditingPresupuesto(null);
        }}
        onSubmit={async (payload) => {
          if (editingPresupuesto) {
            await update(editingPresupuesto.id, payload);
            setPresupuestoSeleccionadoId(editingPresupuesto.id);
          } else {
            const created = await create(payload);
            setPresupuestoSeleccionadoId(created?.id || null);
          }

          setOpenForm(false);
          setEditingPresupuesto(null);
        }}
        submitting={loading}
      />

      <ConfirmModal
        open={openConfirm}
        title="Eliminar presupuesto"
        description="¿Seguro que deseas eliminar este presupuesto? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmVariant="danger"
        loading={loading}
        onConfirm={async () => {
          if (!presupuestoAEliminarId) return;

          await remove(presupuestoAEliminarId);
          setOpenConfirm(false);
          setPresupuestoAEliminarId(null);
        }}
        onCancel={() => setOpenConfirm(false)}
      />
    </section>
  );
}
