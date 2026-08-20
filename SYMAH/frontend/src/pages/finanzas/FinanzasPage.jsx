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
import ErrorModal from "../../components/modals/ErrorModal.jsx";
import useFinanzas from "../../hooks/useFinanzas.jsx";

const COLUMNAS_TRANSACCIONES = [
  { key: "id", label: "ID" },
  { key: "concepto", label: "Concepto" },
  {
    key: "tipo",
    label: "Tipo",
    render: (transaccion) => (
      <Badge variant={obtenerVarianteMovimientoTipo(transaccion.tipo)}>
        {transaccion.tipo}
      </Badge>
    ),
  },
  {
    key: "origen",
    label: "Origen",
    render: (transaccion) =>
      transaccion.entidadOrigenId ||
      transaccion.referencia ||
      transaccion.entidadOrigen ||
      "-",
  },
  {
    key: "destino",
    label: "Destino",
    render: (transaccion) =>
      transaccion.entidadDestinoId || transaccion.entidadDestino || "-",
  },
  {
    key: "fecha",
    label: "Fecha",
    render: (transaccion) => formatDateShort(transaccion.fecha),
  },
  {
    key: "monto",
    label: "Monto",
    align: "right",
    render: (transaccion) => formatCurrency(transaccion.monto),
  },
];

export default function FinanzasPage() {
  const {
    loading,
    transacciones,
    transaccionesFiltradas,
    transaccionesResumen,
    busqueda,
    setBusqueda,
    filtroTipo,
    setFiltroTipo,
    create,
    update,
    remove,
    error: finanzasError,
    reload: reloadFinanzas,
  } = useFinanzas();

  const [transaccionSeleccionadaId, setTransaccionSeleccionadaId] =
    useState("FN-001");
  const [openForm, setOpenForm] = useState(false);
  const [editingTransaccion, setEditingTransaccion] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [transaccionAEliminarId, setTransaccionAEliminarId] = useState(null);
  const modalOpen = openForm || openConfirm;

  const transaccionSeleccionada =
    transaccionesFiltradas.find(
      (transaccion) => transaccion.id === transaccionSeleccionadaId,
    ) ||
    transaccionesFiltradas[0] ||
    null;
  const [filtroMes, setFiltroMes] = useState("todos");
  const [filtroAnno, setFiltroAnno] = useState("todos");

  const transaccionesPeriodo = useMemo(() => {
    if (filtroMes === "todos" && filtroAnno === "todos")
      return transaccionesFiltradas;

    return transaccionesFiltradas.filter((m) => {
      const fecha = new Date(m.fecha);
      const mes = String(fecha.getMonth() + 1).padStart(2, "0");
      const anno = String(fecha.getFullYear());

      const okMes = filtroMes === "todos" || filtroMes === mes;
      const okAnno = filtroAnno === "todos" || filtroAnno === anno;
      return okMes && okAnno;
    });
  }, [transaccionesFiltradas, filtroMes, filtroAnno]);

  const colorPorTipo = {
    ingreso: "#16A34A",
    cobro: "#0EA5E9",
    gasto: "#DC2626",
    pago: "#F59E0B",
  };

  const finanzasPorTipo = useMemo(
    () =>
      Object.entries(FINANZAS_TIPOS).map(([tipo, label]) => {
        const transaccionesTipo = transacciones.filter(
          (transaccion) => transaccion.tipo === tipo,
        );
        const montoTotal = transaccionesTipo.reduce(
          (total, transaccion) => total + transaccion.monto,
          0,
        );

        return {
          label,
          value: montoTotal,
          valueLabel: formatCurrency(montoTotal),
          color: colorPorTipo[tipo] || "#64748B",
        };
      }),
    [transacciones],
  );

  const finanzasPorTipoConteo = useMemo(
    () =>
      Object.entries(FINANZAS_TIPOS).map(([tipo, label]) => {
        const cantidad = transacciones.filter(
          (transaccion) => transaccion.tipo === tipo,
        ).length;

        return {
          label,
          value: cantidad,
          valueLabel: String(cantidad).padStart(2, "0"),
          color: colorPorTipo[tipo] || "#64748B",
        };
      }),
    [transacciones],
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
        <h1 className="sy-page__title">Transacciones</h1>
        <p className="sy-page__description">
          Revisa el historial financiero del sistema y sigue el rastro de cada
          ingreso, gasto, pago o cobro.
        </p>
      </header>

      <div
        className={`sy-page__body ${modalOpen ? "sy-page__body--blurred" : ""}`.trim()}
      >
        <MetricsGrid>
          <SummaryCard
            title="Ingresos"
            value={formatCurrency(transaccionesResumen.ingresos)}
            variant="success"
          />
          <SummaryCard
            title="Gastos"
            value={formatCurrency(transaccionesResumen.gastos)}
            variant="danger"
          />
          <SummaryCard
            title="Neto"
            value={formatCurrency(transaccionesResumen.neto)}
            variant="primary"
          />
          <SummaryCard
            title="Transacciones"
            value={transaccionesResumen.totalMovimientos}
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
                Transacciones financieras
              </strong>
              <Button
                variant="primary"
                onClick={() => {
                  setEditingTransaccion(null);
                  setOpenForm(true);
                }}
                iconLeft={<PlusIcon />}
              >
                Nueva transacción
              </Button>
            </header>

            <DataTable
              columns={COLUMNAS_TRANSACCIONES}
              data={transaccionesPeriodo}
              loading={loading}
              selectedRowId={transaccionSeleccionada?.id}
              onRowClick={(transaccion) =>
                setTransaccionSeleccionadaId(transaccion.id)
              }
              emptyTitle="Sin transacciones coincidentes"
              emptyDescription="No hay transacciones que coincidan con la búsqueda y filtro aplicados."
              renderRowActions={(transaccion) => (
                <div style={{ display: "flex", gap: 8 }}>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setTransaccionSeleccionadaId(transaccion.id);
                      setEditingTransaccion(transaccion);
                      setOpenForm(true);
                    }}
                    iconLeft={<PencilIcon />}
                    ariaLabel={`Editar transacción ${transaccion.id}`}
                  ></Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setTransaccionSeleccionadaId(transaccion.id);
                      setTransaccionAEliminarId(transaccion.id);
                      setOpenConfirm(true);
                    }}
                    iconLeft={<TrashIcon />}
                    ariaLabel={`Eliminar transacción ${transaccion.id}`}
                  ></Button>
                </div>
              )}
            />
          </Card>

          <Card className="sy-section">
            <strong className="sy-section__title">
              Detalle de la transacción
            </strong>

            {transaccionSeleccionada ? (
              <div className="clientes-detalle__body">
                <h2 className="sy-detail-title">
                  {transaccionSeleccionada.concepto}
                </h2>
                <p>
                  <strong>Tipo:</strong>{" "}
                  {FINANZAS_TIPOS[transaccionSeleccionada.tipo] ||
                    transaccionSeleccionada.tipo}
                </p>
                <p>
                  <strong>Referencia:</strong>{" "}
                  {transaccionSeleccionada.referencia}
                </p>
                <p>
                  <strong>Origen:</strong>{" "}
                  {transaccionSeleccionada.entidadOrigen || "-"}{" "}
                  {transaccionSeleccionada.entidadOrigenId ||
                    transaccionSeleccionada.referencia ||
                    ""}
                </p>
                <p>
                  <strong>Destino:</strong>{" "}
                  {transaccionSeleccionada.entidadDestino || "-"}{" "}
                  {transaccionSeleccionada.entidadDestinoId || ""}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {formatDateShort(transaccionSeleccionada.fecha)}
                </p>
                <p>
                  <strong>Monto:</strong>{" "}
                  {formatCurrency(transaccionSeleccionada.monto)}
                </p>
                <p>
                  <strong>Observaciones:</strong>{" "}
                  {transaccionSeleccionada.observaciones || "-"}
                </p>
              </div>
            ) : (
              <EmptyState
                title="Sin transacción seleccionada"
                description="Selecciona una transacción para ver su detalle."
              />
            )}
          </Card>
        </section>

        <section className="dashboard-charts-grid">
          <DonutChart
            title="Flujo por tipo"
            description="Distribución del monto total por tipo de transacción."
            totalLabel="Monto total"
            formatValue={formatCurrency}
            data={finanzasPorTipo}
          />

          <BarChart
            title="Cantidad por tipo"
            description="Número de transacciones por tipo, sin aplicar filtros de periodo."
            data={finanzasPorTipoConteo}
          />
        </section>
      </div>

      <MovimientoFormModal
        open={openForm}
        initial={editingTransaccion}
        onClose={() => {
          setOpenForm(false);
          setEditingTransaccion(null);
        }}
        onSubmit={async (payload) => {
          if (editingTransaccion) {
            await update(editingTransaccion.id, payload);
            setTransaccionSeleccionadaId(editingTransaccion.id);
          } else {
            const created = await create(payload);
            setTransaccionSeleccionadaId(created?.id || null);
          }

          setOpenForm(false);
          setEditingTransaccion(null);
        }}
        submitting={loading}
      />

      <ConfirmModal
        open={openConfirm}
        title="Eliminar transacción"
        description="¿Seguro que deseas eliminar esta transacción? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmVariant="danger"
        loading={loading}
        onConfirm={async () => {
          if (!transaccionAEliminarId) return;

          await remove(transaccionAEliminarId);
          setOpenConfirm(false);
          setTransaccionAEliminarId(null);
          if (transaccionSeleccionadaId === transaccionAEliminarId) {
            setTransaccionSeleccionadaId(null);
          }
        }}
        onCancel={() => setOpenConfirm(false)}
      />

      <ErrorModal
        open={!!finanzasError}
        message={finanzasError?.message || String(finanzasError)}
        onClose={() => reloadFinanzas && reloadFinanzas()}
      />
    </section>
  );
}
