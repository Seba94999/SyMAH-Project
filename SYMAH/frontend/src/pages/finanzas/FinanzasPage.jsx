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
  FINANZAS_TIPOS,
  formatCurrency,
  obtenerVarianteMovimientoTipo,
} from "../../services/FinanzasService.jsx";
import { formatDateShort } from "../../utils/formatters.js";
import ConfirmModal from "../../components/modals/ConfirmModal.jsx";
import MovimientoFormModal from "../../components/modals/MovimientoFormModal.jsx";
import useFinanzas from "../../hooks/useFinanzas.jsx";

const COLUMNAS_MOVIMIENTOS = [
  { key: "id", label: "ID" },
  { key: "concepto", label: "Concepto" },
  {
    key: "tipo",
    label: "Tipo",
    render: (movimiento) => (
      <Badge variant={obtenerVarianteMovimientoTipo(movimiento.tipo)}>
        {movimiento.tipo}
      </Badge>
    ),
  },
  { key: "referencia", label: "Referencia" },
  {
    key: "fecha",
    label: "Fecha",
    render: (movimiento) => formatDateShort(movimiento.fecha),
  },
  {
    key: "monto",
    label: "Monto",
    align: "right",
    render: (movimiento) => formatCurrency(movimiento.monto),
  },
];

export default function FinanzasPage() {
  const {
    loading,
    movimientos,
    movimientosFiltrados,
    resumen,
    busqueda,
    setBusqueda,
    filtroTipo,
    setFiltroTipo,
    create,
    update,
    remove,
  } = useFinanzas();

  const [movimientoSeleccionadoId, setMovimientoSeleccionadoId] =
    useState("FN-001");
  const [openForm, setOpenForm] = useState(false);
  const [editingMovimiento, setEditingMovimiento] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [movimientoAEliminarId, setMovimientoAEliminarId] = useState(null);
  const modalOpen = openForm || openConfirm;

  const movimientoSeleccionado =
    movimientosFiltrados.find(
      (movimiento) => movimiento.id === movimientoSeleccionadoId,
    ) ||
    movimientosFiltrados[0] ||
    null;
  const [filtroMes, setFiltroMes] = useState("todos");
  const [filtroAnno, setFiltroAnno] = useState("todos");

  const movimientosPeriodo = useMemo(() => {
    if (filtroMes === "todos" && filtroAnno === "todos")
      return movimientosFiltrados;

    return movimientosFiltrados.filter((m) => {
      const fecha = new Date(m.fecha);
      const mes = String(fecha.getMonth() + 1).padStart(2, "0");
      const anno = String(fecha.getFullYear());

      const okMes = filtroMes === "todos" || filtroMes === mes;
      const okAnno = filtroAnno === "todos" || filtroAnno === anno;
      return okMes && okAnno;
    });
  }, [movimientosFiltrados, filtroMes, filtroAnno]);

  const colorPorTipo = {
    ingreso: "#16A34A",
    cobro: "#0EA5E9",
    gasto: "#DC2626",
    pago: "#F59E0B",
  };

  const finanzasPorTipo = useMemo(
    () =>
      Object.entries(FINANZAS_TIPOS).map(([tipo, label]) => {
        const movimientosTipo = movimientos.filter(
          (movimiento) => movimiento.tipo === tipo,
        );
        const montoTotal = movimientosTipo.reduce(
          (total, movimiento) => total + movimiento.monto,
          0,
        );

        return {
          label,
          value: montoTotal,
          valueLabel: formatCurrency(montoTotal),
          color: colorPorTipo[tipo] || "#64748B",
        };
      }),
    [movimientos],
  );

  const finanzasPorTipoConteo = useMemo(
    () =>
      Object.entries(FINANZAS_TIPOS).map(([tipo, label]) => {
        const cantidad = movimientos.filter(
          (movimiento) => movimiento.tipo === tipo,
        ).length;

        return {
          label,
          value: cantidad,
          valueLabel: String(cantidad).padStart(2, "0"),
          color: colorPorTipo[tipo] || "#64748B",
        };
      }),
    [movimientos],
  );

  const filtrosTipo = [
    { value: "todos", label: "Todos" },
    ...Object.entries(FINANZAS_TIPOS).map(([value, label]) => ({
      value,
      label: `${label}s`,
    })),
  ];

  return (
    <section className="sy-page">
      <header className="sy-page__header">
        <p className="sy-page__eyebrow">Tesorería</p>
        <h1 className="sy-page__title">Finanzas</h1>
        <p className="sy-page__description">
          Revisa el flujo de ingresos, gastos y movimientos recientes para
          mantener el balance operativo.
        </p>
      </header>

      <div
        className={`sy-page__body ${modalOpen ? "sy-page__body--blurred" : ""}`.trim()}
      >
        <MetricsGrid>
          <SummaryCard
            title="Ingresos"
            value={formatCurrency(resumen.ingresos)}
            variant="success"
          />
          <SummaryCard
            title="Gastos"
            value={formatCurrency(resumen.gastos)}
            variant="danger"
          />
          <SummaryCard
            title="Neto"
            value={formatCurrency(resumen.neto)}
            variant="primary"
          />
          <SummaryCard
            title="Movimientos"
            value={resumen.totalMovimientos}
            variant="warning"
          />
        </MetricsGrid>

        <section className="sy-table-filters-with-period">
          <TableFilters
            searchValue={busqueda}
            onSearchChange={setBusqueda}
            searchPlaceholder="Buscar por concepto, ID o referencia"
            filterValue={filtroTipo}
            onFilterChange={setFiltroTipo}
            filterOptions={filtrosTipo}
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
        </section>

        <section className="sy-grid sy-grid--sidebar">
          <Card className="sy-section">
            <header className="sy-section__header">
              <strong className="sy-section__title">
                Movimientos financieros
              </strong>
              <Button
                variant="primary"
                onClick={() => {
                  setEditingMovimiento(null);
                  setOpenForm(true);
                }}
                iconLeft={<PlusIcon />}
              >
                Nuevo movimiento
              </Button>
            </header>

            <DataTable
              columns={COLUMNAS_MOVIMIENTOS}
              data={movimientosPeriodo}
              loading={loading}
              selectedRowId={movimientoSeleccionado?.id}
              onRowClick={(movimiento) =>
                setMovimientoSeleccionadoId(movimiento.id)
              }
              emptyTitle="Sin movimientos coincidentes"
              emptyDescription="No hay movimientos que coincidan con la búsqueda y filtro aplicados."
              renderRowActions={(movimiento) => (
                <div style={{ display: "flex", gap: 8 }}>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setMovimientoSeleccionadoId(movimiento.id);
                      setEditingMovimiento(movimiento);
                      setOpenForm(true);
                    }}
                    iconLeft={<PencilIcon />}
                    ariaLabel={`Editar movimiento ${movimiento.id}`}
                  ></Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setMovimientoSeleccionadoId(movimiento.id);
                      setMovimientoAEliminarId(movimiento.id);
                      setOpenConfirm(true);
                    }}
                    iconLeft={<TrashIcon />}
                    ariaLabel={`Eliminar movimiento ${movimiento.id}`}
                  ></Button>
                </div>
              )}
            />
          </Card>

          <Card className="sy-section">
            <strong className="sy-section__title">
              Detalle del movimiento
            </strong>

            {movimientoSeleccionado ? (
              <div className="clientes-detalle__body">
                <h2 className="sy-detail-title">
                  {movimientoSeleccionado.concepto}
                </h2>
                <p>
                  <strong>Tipo:</strong>{" "}
                  {FINANZAS_TIPOS[movimientoSeleccionado.tipo] ||
                    movimientoSeleccionado.tipo}
                </p>
                <p>
                  <strong>Referencia:</strong>{" "}
                  {movimientoSeleccionado.referencia}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {formatDateShort(movimientoSeleccionado.fecha)}
                </p>
                <p>
                  <strong>Monto:</strong>{" "}
                  {formatCurrency(movimientoSeleccionado.monto)}
                </p>
              </div>
            ) : (
              <EmptyState
                title="Sin movimiento seleccionado"
                description="Selecciona un movimiento para ver su detalle."
              />
            )}
          </Card>
        </section>
        <section className="dashboard-charts-grid">
          <DonutChart
            title="Flujo por tipo"
            description="Distribución del monto total por tipo de movimiento."
            totalLabel="Monto total"
            formatValue={formatCurrency}
            data={finanzasPorTipo}
          />

          <BarChart
            title="Cantidad por tipo"
            description="Número de movimientos por tipo, sin aplicar filtros de periodo."
            data={finanzasPorTipoConteo}
          />
        </section>
      </div>

      <MovimientoFormModal
        open={openForm}
        initial={editingMovimiento}
        onClose={() => {
          setOpenForm(false);
          setEditingMovimiento(null);
        }}
        onSubmit={async (payload) => {
          if (editingMovimiento) {
            await update(editingMovimiento.id, payload);
            setMovimientoSeleccionadoId(editingMovimiento.id);
          } else {
            const created = await create(payload);
            setMovimientoSeleccionadoId(created?.id || null);
          }

          setOpenForm(false);
          setEditingMovimiento(null);
        }}
        submitting={loading}
      />

      <ConfirmModal
        open={openConfirm}
        title="Eliminar movimiento"
        description="¿Seguro que deseas eliminar este movimiento? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmVariant="danger"
        loading={loading}
        onConfirm={async () => {
          if (!movimientoAEliminarId) return;

          await remove(movimientoAEliminarId);
          setOpenConfirm(false);
          setMovimientoAEliminarId(null);
          if (movimientoSeleccionadoId === movimientoAEliminarId) {
            setMovimientoSeleccionadoId(null);
          }
        }}
        onCancel={() => setOpenConfirm(false)}
      />
    </section>
  );
}
