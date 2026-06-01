import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card } from "../../components/Ui.jsx";
import { MetricsGrid, SummaryCard } from "../../components/Dashboard.jsx";
import { BarChart, DonutChart } from "../../components/charts/index.js";
import ClienteFormModal from "../../components/modals/ClienteFormModal.jsx";
import PresupuestoFormModal from "../../components/modals/PresupuestoFormModal.jsx";
import useClientes from "../../hooks/useClientes.jsx";
import useFinanzas from "../../hooks/useFinanzas.jsx";
import usePresupuestos from "../../hooks/usePresupuestos.jsx";
import useTrabajos from "../../hooks/useTrabajos.jsx";
import { formatCurrency } from "../../services/FinanzasService.jsx";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [openClienteForm, setOpenClienteForm] = useState(false);
  const [openPresupuestoForm, setOpenPresupuestoForm] = useState(false);

  const {
    resumen: resumenClientes,
    create: createCliente,
    loading: creatingCliente,
  } = useClientes();
  const {
    resumen: resumenPresupuestos,
    create: createPresupuesto,
    loading: creatingPresupuesto,
  } = usePresupuestos();
  const { resumen: resumenTrabajos } = useTrabajos();
  const { resumen: resumenFinanzas } = useFinanzas();

  const totalTrabajos = resumenTrabajos.total || 1;
  const estabilidadOperativa = Math.round(
    ((resumenTrabajos.enCurso + resumenTrabajos.finalizados) / totalTrabajos) *
      100,
  );
  const clientesChartData = useMemo(
    () => [
      {
        label: "Activos",
        value: resumenClientes.activos,
        valueLabel: String(resumenClientes.activos).padStart(2, "0"),
        color: "#16A34A",
      },
      {
        label: "En riesgo",
        value: resumenClientes.enRiesgo,
        valueLabel: String(resumenClientes.enRiesgo).padStart(2, "0"),
        color: "#D97706",
      },
      {
        label: "Inactivos",
        value:
          resumenClientes.total -
          resumenClientes.activos -
          resumenClientes.enRiesgo,
        valueLabel: String(
          resumenClientes.total -
            resumenClientes.activos -
            resumenClientes.enRiesgo,
        ).padStart(2, "0"),
        color: "#DC2626",
      },
    ],
    [resumenClientes],
  );
  const trabajosChartData = useMemo(() => {
    const enCurso = resumenTrabajos.enCurso;
    const finalizados = resumenTrabajos.finalizados;
    const cancelados = resumenTrabajos.cancelados;

    return [
      {
        label: "En curso",
        value: enCurso,
        valueLabel: String(enCurso).padStart(2, "0"),
        color: "#0284C7",
      },
      {
        label: "Finalizados",
        value: finalizados,
        valueLabel: String(finalizados).padStart(2, "0"),
        color: "#16A34A",
      },
      {
        label: "Cancelados",
        value: cancelados,
        valueLabel: String(cancelados).padStart(2, "0"),
        color: "#DC2626",
      },
    ];
  }, [resumenTrabajos]);

  const finanzasChartData = useMemo(() => {
    const ingresos = resumenFinanzas.ingresos;
    const gastos = resumenFinanzas.gastos;

    return [
      {
        label: "Ingresos",
        value: ingresos,
        valueLabel: formatCurrency(ingresos),
        color: "#16A34A",
      },
      {
        label: "Gastos",
        value: gastos,
        valueLabel: formatCurrency(gastos),
        color: "#DC2626",
      },
    ];
  }, [resumenFinanzas]);
  const modalOpen = openClienteForm || openPresupuestoForm;

  return (
    <section className="dashboard-page sy-page">
      <header className="dashboard-hero sy-surface sy-page__header">
        <div className="dashboard-hero__content">
          <p className="dashboard-hero__eyebrow sy-page__eyebrow">
            Resumen operativo
          </p>
          <h1 className="dashboard-hero__title sy-page__title">Dashboard</h1>
          <p className="dashboard-hero__description sy-page__description">
            Base inicial del panel principal de SYMAH para monitorear actividad,
            clientes y seguimiento operativo.
          </p>
        </div>

        <div className="dashboard-hero__action sy-toolbar__group">
          <Badge variant="primary">Actualizado hace unos segundos</Badge>
          <Button variant="secondary" onClick={() => navigate("/clientes")}>
            Ver clientes
          </Button>
        </div>
      </header>

      <div
        className={`sy-page__body ${modalOpen ? "sy-page__body--blurred" : ""}`.trim()}
      >
        <MetricsGrid>
          <SummaryCard
            title="Estado general"
            value={`${estabilidadOperativa}%`}
            description="Estabilidad operativa estimada según estado de trabajos."
            variant="success"
          />
          <SummaryCard
            title="Clientes activos"
            value={String(resumenClientes.activos).padStart(2, "0")}
            description="Cuentas con seguimiento vigente."
            variant="primary"
          />
          <SummaryCard
            title="Presupuestos pendientes"
            value={String(resumenPresupuestos.pendientes).padStart(2, "0")}
            description="Operaciones comerciales en seguimiento."
            variant="warning"
          />
        </MetricsGrid>

        <section className="dashboard-grid sy-grid sy-grid--2">
          <Card className="dashboard-card dashboard-card--accent sy-stack">
            <h2 className="dashboard-card__title">Acciones rápidas</h2>
            <div className="dashboard-quick-actions">
              <Button
                className="dashboard-quick-actions__item"
                variant="primary"
                onClick={() => setOpenClienteForm(true)}
              >
                Registrar nuevo cliente
              </Button>
              <Button
                className="dashboard-quick-actions__item"
                variant="secondary"
                onClick={() => navigate("/clientes")}
              >
                Revisar cuentas en riesgo
              </Button>
              <Button
                className="dashboard-quick-actions__item"
                variant="secondary"
                onClick={() => setOpenPresupuestoForm(true)}
              >
                Crear presupuesto
              </Button>
            </div>
          </Card>

          <Card className="dashboard-card sy-stack">
            <h2 className="dashboard-card__title">Seguimiento operativo</h2>
            <p className="dashboard-card__text">
              Los siguientes módulos ya están listos para conectarse con datos
              reales, servicios y acciones de negocio.
            </p>
            <div className="dashboard-module-actions sy-toolbar__group">
              <Badge variant="success">Componentes reutilizados</Badge>
              <Button variant="secondary" onClick={() => navigate("/trabajos")}>
                Ver trabajos
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/presupuestos")}
              >
                Ver presupuestos
              </Button>
            </div>
          </Card>
        </section>
        <section className="dashboard-charts-grid">
          <Card className="dashboard-card dashboard-card--chart">
            <BarChart
              title="Distribución de clientes"
              description="Resumen visual de cartera activa, en riesgo e inactiva."
              data={clientesChartData}
            />
          </Card>

          <Card className="dashboard-card dashboard-card--chart">
            <BarChart
              title="Estado de trabajos"
              description="Lectura rápida del avance operativo actual."
              data={trabajosChartData}
            />
          </Card>

          <Card className="dashboard-card dashboard-card--chart dashboard-card--wide">
            <DonutChart
              title="Flujo financiero"
              description="Distribución del flujo entre ingresos y gastos."
              totalLabel="Monto total movido"
              formatValue={formatCurrency}
              data={finanzasChartData}
            />
          </Card>
        </section>
      </div>

      <ClienteFormModal
        open={openClienteForm}
        onClose={() => setOpenClienteForm(false)}
        onSubmit={async (payload) => {
          await createCliente(payload);
          setOpenClienteForm(false);
        }}
        submitting={creatingCliente}
      />

      <PresupuestoFormModal
        open={openPresupuestoForm}
        onClose={() => setOpenPresupuestoForm(false)}
        onSubmit={async (payload) => {
          await createPresupuesto(payload);
          setOpenPresupuestoForm(false);
        }}
        submitting={creatingPresupuesto}
      />
    </section>
  );
}
