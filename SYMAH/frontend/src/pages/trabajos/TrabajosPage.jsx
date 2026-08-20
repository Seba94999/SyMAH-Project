import { useMemo, useState } from "react";
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
import { BarChart, DonutChart } from "../../components/charts/index.js";
import {
  TRABAJOS_STATUS,
  formatCurrency,
  obtenerVarianteTrabajoEstado,
} from "../../services/TrabajosService.jsx";
import ConfirmModal from "../../components/modals/ConfirmModal.jsx";
import TrabajoFormModal from "../../components/modals/TrabajoFormModal.jsx";
import useTrabajos from "../../hooks/useTrabajos.jsx";
import ErrorModal from "../../components/modals/ErrorModal.jsx";

const COLUMNAS_TRABAJOS = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Trabajo" },
  {
    key: "cliente",
    label: "Cliente",
    render: (trabajo) => trabajo.cliente || trabajo.clienteId,
  },
  {
    key: "estado",
    label: "Estado",
    render: (trabajo) => (
      <Badge variant={obtenerVarianteTrabajoEstado(trabajo.estado)}>
        {TRABAJOS_STATUS[trabajo.estado]}
      </Badge>
    ),
  },

  {
    key: "monto",
    label: "Monto",
    align: "right",
    render: (trabajo) => formatCurrency(trabajo.monto),
  },
  {
    key: "gastoManoObra",
    label: "Mano de obra",
    align: "right",
    render: (trabajo) => formatCurrency(trabajo.gastoManoObra || 0),
  },
  {
    key: "cobrado",
    label: "Cobrado",
    align: "right",
    render: (trabajo) => formatCurrency(trabajo.cobrado || 0),
  },
];

export default function TrabajosPage() {
  const {
    loading,
    trabajos,
    trabajosFiltrados,
    resumen,
    busqueda,
    setBusqueda,
    filtroEstado,
    setFiltroEstado,
    create,
    update,
    remove,
    error: trabajosError,
    reload: reloadTrabajos,
  } = useTrabajos();

  const [trabajoSeleccionadoId, setTrabajoSeleccionadoId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingTrabajo, setEditingTrabajo] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [trabajoAEliminarId, setTrabajoAEliminarId] = useState(null);
  const modalOpen = openForm || openConfirm;

  const trabajoSeleccionado =
    trabajosFiltrados.find((trabajo) => trabajo.id === trabajoSeleccionadoId) ||
    trabajosFiltrados[0] ||
    null;

  const [filtroMes, setFiltroMes] = useState("todos");
  const [filtroAnno, setFiltroAnno] = useState("todos");

  const trabajosPeriodo = useMemo(() => {
    if (filtroMes === "todos" && filtroAnno === "todos")
      return trabajosFiltrados;

    return trabajosFiltrados.filter((t) => {
      const fecha = new Date(t.ultimaActualizacion || t.fecha || null);
      if (!fecha || isNaN(fecha.getTime())) return false;
      const mes = String(fecha.getMonth() + 1).padStart(2, "0");
      const anno = String(fecha.getFullYear());

      const okMes = filtroMes === "todos" || filtroMes === mes;
      const okAnno = filtroAnno === "todos" || filtroAnno === anno;
      return okMes && okAnno;
    });
  }, [trabajosFiltrados, filtroMes, filtroAnno]);

  const trabajosPorEstado = useMemo(
    () =>
      Object.entries(TRABAJOS_STATUS).map(([estado, label]) => {
        const trabajosEstado = trabajos.filter(
          (trabajo) => trabajo.estado === estado,
        );
        const presupuestoTotal = trabajosEstado.reduce(
          (total, trabajo) => total + trabajo.monto,
          0,
        );

        return {
          label,
          value: presupuestoTotal,
          valueLabel: formatCurrency(presupuestoTotal),
          color:
            estado === "enCurso"
              ? "#16A34A"
              : estado === "enPausa"
                ? "#D97706"
                : estado === "finalizado"
                  ? "#0284C7"
                  : "#DC2626",
        };
      }),
    [trabajos],
  );

  const trabajosPorEstadoConteo = useMemo(
    () =>
      Object.entries(TRABAJOS_STATUS).map(([estado, label]) => ({
        label,
        value: trabajos.filter((trabajo) => trabajo.estado === estado).length,
        valueLabel: String(
          trabajos.filter((trabajo) => trabajo.estado === estado).length,
        ).padStart(2, "0"),
        color:
          estado === "enCurso"
            ? "#16A34A"
            : estado === "enPausa"
              ? "#D97706"
              : estado === "finalizado"
                ? "#0284C7"
                : "#DC2626",
      })),
    [trabajos],
  );

  return (
    <section className="sy-page">
      <header className="sy-page__header">
        <p className="sy-page__eyebrow">Operación</p>
        <h1 className="sy-page__title">Trabajos</h1>
        <p className="sy-page__description">
          Monitorea el avance, el estado y el presupuesto de cada trabajo activo
          o cerrado.
        </p>
      </header>

      <div
        className={`sy-page__body ${modalOpen ? "sy-page__body--blurred" : ""}`.trim()}
      >
        <MetricsGrid>
          <SummaryCard
            title="Total trabajos"
            value={resumen.total}
            variant="primary"
          />
          <SummaryCard
            title="En curso"
            value={resumen.enCurso}
            variant="success"
          />
          <SummaryCard
            title="Finalizados"
            value={resumen.finalizados}
            variant="primary"
          />
          <SummaryCard
            title="Cancelados"
            value={resumen.cancelados}
            variant="danger"
          />
          <SummaryCard
            title="Mano de obra"
            value={formatCurrency(resumen.gastoManoObra)}
            variant="warning"
          />
          <SummaryCard
            title="Cobrado"
            value={formatCurrency(resumen.cobrado)}
            variant="success"
          />
        </MetricsGrid>

        <section className="sy-grid sy-grid--sidebar">
          <Card className="sy-section">
            <header className="sy-section__header">
              <strong className="sy-section__title">Listado de trabajos</strong>
              <Button
                variant="primary"
                onClick={() => {
                  setEditingTrabajo(null);
                  setOpenForm(true);
                }}
                iconLeft={<PlusIcon />}
              >
                Nuevo trabajo
              </Button>
            </header>

            <div className="sy-table-filters-with-period">
              <TableFilters
                searchValue={busqueda}
                onSearchChange={setBusqueda}
                searchPlaceholder="Buscar por trabajo, cliente o responsable"
                filterValue={filtroEstado}
                onFilterChange={setFiltroEstado}
                filterOptions={[
                  { value: "todos", label: "Todos" },
                  { value: "enCurso", label: "En curso" },
                  { value: "enPausa", label: "En pausa" },
                  { value: "finalizado", label: "Finalizados" },
                  { value: "cancelado", label: "Cancelados" },
                ]}
              />

              <div className="sy-table__period-filters">
                <select
                  className="sy-select"
                  value={filtroMes}
                  onChange={(e) => setFiltroMes(e.target.value)}
                >
                  <option value="todos">Mes: Todos</option>
                  <option value="01">Enero</option>
                  <option value="02">Febrero</option>
                  <option value="03">Marzo</option>
                  <option value="04">Abril</option>
                  <option value="05">Mayo</option>
                  <option value="06">Junio</option>
                  <option value="07">Julio</option>
                  <option value="08">Agosto</option>
                  <option value="09">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>

                <select
                  className="sy-select"
                  value={filtroAnno}
                  onChange={(e) => setFiltroAnno(e.target.value)}
                >
                  <option value="todos">Año: Todos</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
            </div>

            <DataTable
              columns={COLUMNAS_TRABAJOS}
              data={trabajosPeriodo}
              loading={loading}
              selectedRowId={trabajoSeleccionado?.id}
              onRowClick={(trabajo) => setTrabajoSeleccionadoId(trabajo.id)}
              emptyTitle="Sin trabajos coincidentes"
              emptyDescription="No hay trabajos que coincidan con la búsqueda y filtro aplicados."
              renderRowActions={(trabajo) => (
                <div style={{ display: "flex", gap: 8 }}>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setTrabajoSeleccionadoId(trabajo.id);
                      setEditingTrabajo(trabajo);
                      setOpenForm(true);
                    }}
                    iconLeft={<PencilIcon />}
                    ariaLabel={`Editar trabajo ${trabajo.nombre}`}
                  ></Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setTrabajoSeleccionadoId(trabajo.id);
                      setTrabajoAEliminarId(trabajo.id);
                      setOpenConfirm(true);
                    }}
                    iconLeft={<TrashIcon />}
                    ariaLabel={`Eliminar trabajo ${trabajo.nombre}`}
                  ></Button>
                </div>
              )}
            />
          </Card>

          <Card className="sy-section">
            <strong className="sy-section__title">Ficha del trabajo</strong>

            {trabajoSeleccionado ? (
              <div className="clientes-detalle__body">
                <h2 className="sy-detail-title">
                  {trabajoSeleccionado.nombre}
                </h2>
                <p>
                  <strong>Cliente:</strong>{" "}
                  {trabajoSeleccionado.cliente || trabajoSeleccionado.clienteId}
                </p>
                <p>
                  <strong>Responsable:</strong>{" "}
                  {trabajoSeleccionado.responsableId}
                </p>
                <p>
                  <strong>Prioridad:</strong> {trabajoSeleccionado.prioridad}
                </p>

                <p>
                  <strong>Monto:</strong>{" "}
                  {formatCurrency(trabajoSeleccionado.monto || 0)}
                </p>
                <p>
                  <strong>Gasto mano de obra:</strong>{" "}
                  {formatCurrency(trabajoSeleccionado.gastoManoObra || 0)}
                </p>
                <p>
                  <strong>Cobrado:</strong>{" "}
                  {formatCurrency(trabajoSeleccionado.cobrado || 0)}
                </p>
                <p>
                  <strong>Saldo por cobrar:</strong>{" "}
                  {formatCurrency(trabajoSeleccionado.saldoPorCobrar || 0)}
                </p>
                <p>
                  <strong>Jornadas vinculadas:</strong>{" "}
                  {trabajoSeleccionado.trazabilidad?.totalJornadas || 0}
                </p>
                <p>
                  <strong>Transacciones de cobro:</strong>{" "}
                  {trabajoSeleccionado.trazabilidad?.totalMovimientosCobro || 0}
                </p>
                <p>
                  <strong>Última actualización:</strong>{" "}
                  {trabajoSeleccionado.ultimaActualizacion}
                </p>
              </div>
            ) : (
              <EmptyState
                title="Sin trabajo seleccionado"
                description="Selecciona un trabajo para ver su detalle."
              />
            )}
          </Card>
        </section>
        <section className="dashboard-charts-grid">
          <DonutChart
            title="Presupuesto por estado"
            description="Participación del monto total según el estado de los trabajos."
            totalLabel="Monto total"
            formatValue={formatCurrency}
            data={trabajosPorEstado}
          />

          <BarChart
            title="Cantidad por estado"
            description="Número de trabajos por estado, sin aplicar filtros de periodo."
            data={trabajosPorEstadoConteo}
          />
        </section>
      </div>

      <TrabajoFormModal
        open={openForm}
        initial={editingTrabajo}
        onClose={() => {
          setOpenForm(false);
          setEditingTrabajo(null);
        }}
        onSubmit={async (payload) => {
          console.log("PAYLOAD RECIBIDO:", payload);
          console.log("EDITING:", editingTrabajo);
          console.log("ID:", editingTrabajo?.id);
          if (editingTrabajo) {
            await update(editingTrabajo.id, payload);
            setTrabajoSeleccionadoId(editingTrabajo.id);
          } else {
            const created = await create(payload);
            setTrabajoSeleccionadoId(created?.id || null);
          }

          setOpenForm(false);
          setEditingTrabajo(null);
        }}
        submitting={loading}
      />

      <ConfirmModal
        open={openConfirm}
        title="Eliminar trabajo"
        description="¿Seguro que deseas eliminar este trabajo? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmVariant="danger"
        loading={loading}
        onConfirm={async () => {
          if (!trabajoAEliminarId) return;

          await remove(trabajoAEliminarId);
          setOpenConfirm(false);
          setTrabajoAEliminarId(null);
        }}
        onCancel={() => setOpenConfirm(false)}
      />

      <ErrorModal
        open={!!trabajosError}
        message={trabajosError?.message || String(trabajosError)}
        onClose={() => reloadTrabajos && reloadTrabajos()}
      />
    </section>
  );
}
