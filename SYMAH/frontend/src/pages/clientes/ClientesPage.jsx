import { useState } from "react";
import {
  CLIENT_STATUS,
  formatearMoneda,
} from "../../services/ClientesService.jsx";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "../../components/Ui.jsx";
import { SummaryCard } from "../../components/Dashboard.jsx";
import { DataTable, TableFilters } from "../../components/Tables.jsx";
import ConfirmModal from "../../components/modals/ConfirmModal.jsx";
import ClienteFormModal from "../../components/modals/ClienteFormModal.jsx";
import useClientes from "../../hooks/useClientes.jsx";

const COLUMNAS_CLIENTES = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Cliente", render: (cliente) => cliente.nombre },
  { key: "ciudad", label: "Ciudad" },
  {
    key: "estado",
    label: "Estado",
    render: (cliente) => (
      <Badge variant={obtenerVarianteEstado(cliente.estado)}>
        {CLIENT_STATUS[cliente.estado]}
      </Badge>
    ),
  },
  {
    key: "balancePendiente",
    label: "Saldo",
    render: (cliente) => formatearMoneda(cliente.balancePendiente),
    align: "right",
  },
];

function obtenerVarianteEstado(estado) {
  if (estado === "activo") {
    return "success";
  }

  if (estado === "enRiesgo") {
    return "warning";
  }

  return "danger";
}

export default function ClientesPage() {
  const {
    loading,
    clientesFiltrados,
    resumen,
    busqueda,
    setBusqueda,
    filtroEstado,
    setFiltroEstado,
    create,
    update,
    remove,
  } = useClientes();

  const [clienteSeleccionadoId, setClienteSeleccionadoId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [clienteAEliminarId, setClienteAEliminarId] = useState(null);
  const modalOpen = openForm || openConfirm;

  const clienteSeleccionado =
    clientesFiltrados.find((cliente) => cliente.id === clienteSeleccionadoId) ||
    clientesFiltrados[0] ||
    null;

  const filtrosEstado = [
    { value: "todos", label: "Todos" },
    { value: "activo", label: "Activos" },
    { value: "enRiesgo", label: "En riesgo" },
    { value: "inactivo", label: "Inactivos" },
  ];

  return (
    <section className="clientes-page sy-page">
      <header className="clientes-page__header sy-page__header">
        <h1 className="clientes-page__title sy-page__title">Clientes</h1>
        <p className="clientes-page__description sy-page__description">
          Gestiona la cartera comercial, identifica cuentas en riesgo y revisa
          rapidamente la informacion clave de cada cliente.
        </p>
      </header>

      <div
        className={`sy-page__body ${modalOpen ? "sy-page__body--blurred" : ""}`.trim()}
      >
        <section className="clientes-resumen-grid">
          <SummaryCard
            title="Total clientes"
            value={resumen.total}
            variant="primary"
          />
          <SummaryCard
            title="Activos"
            value={resumen.activos}
            variant="success"
          />
          <SummaryCard
            title="En riesgo"
            value={resumen.enRiesgo}
            variant="warning"
          />
          <SummaryCard
            title="Saldo pendiente"
            value={formatearMoneda(resumen.saldoTotal)}
            variant="danger"
          />
        </section>

        <section className="clientes-content-grid">
          <Card className="clientes-card--listado sy-section">
            <header className="sy-section__header">
              <strong className="sy-section__title">Listado de clientes</strong>
              <Button
                variant="primary"
                onClick={() => {
                  setEditingCliente(null);
                  setOpenForm(true);
                }}
                iconLeft={<PlusIcon />}
              >
                Nuevo cliente
              </Button>
            </header>

            <TableFilters
              searchValue={busqueda}
              onSearchChange={setBusqueda}
              searchPlaceholder="Buscar por nombre, ID o contacto"
              filterValue={filtroEstado}
              onFilterChange={setFiltroEstado}
              filterOptions={filtrosEstado}
            />

            <DataTable
              columns={COLUMNAS_CLIENTES}
              data={clientesFiltrados}
              loading={loading}
              selectedRowId={clienteSeleccionado?.id}
              onRowClick={(cliente) => setClienteSeleccionadoId(cliente.id)}
              emptyTitle="Sin clientes coincidentes"
              emptyDescription="No hay clientes que coincidan con la búsqueda y filtro aplicados."
              renderRowActions={(cliente) => (
                <div style={{ display: "flex", gap: 8 }}>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setClienteSeleccionadoId(cliente.id);
                      setEditingCliente(cliente);
                      setOpenForm(true);
                    }}
                    iconLeft={<PencilIcon />}
                    ariaLabel={`Editar cliente ${cliente.nombre}`}
                  ></Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setClienteSeleccionadoId(cliente.id);
                      setClienteAEliminarId(cliente.id);
                      setOpenConfirm(true);
                    }}
                    iconLeft={<TrashIcon />}
                    ariaLabel={`Eliminar cliente ${cliente.nombre}`}
                  ></Button>
                </div>
              )}
            />
          </Card>

          <Card className="clientes-card--detalle sy-section">
            <strong className="sy-section__title">Ficha de cliente</strong>

            {clienteSeleccionado ? (
              <>
                <h2 className="clientes-detalle__title sy-page__title clientes-detalle__title--compact">
                  {clienteSeleccionado.nombre}
                </h2>
                <p className="clientes-detalle__rubro">
                  {clienteSeleccionado.rubro}
                </p>

                <div className="clientes-detalle__body">
                  <p>
                    <strong>Contacto:</strong> {clienteSeleccionado.contacto}
                  </p>
                  <p>
                    <strong>Correo:</strong> {clienteSeleccionado.correo}
                  </p>
                  <p>
                    <strong>Telefono:</strong> {clienteSeleccionado.telefono}
                  </p>
                  <p>
                    <strong>Ultimo trabajo:</strong>{" "}
                    {clienteSeleccionado.ultimoTrabajo}
                  </p>
                  <p>
                    <strong>Saldo pendiente:</strong>{" "}
                    {formatearMoneda(clienteSeleccionado.balancePendiente)}
                  </p>
                </div>
              </>
            ) : (
              <EmptyState
                title="Sin cliente seleccionado"
                description="Selecciona un cliente para ver su detalle."
              />
            )}
          </Card>
        </section>
      </div>

      <ClienteFormModal
        open={openForm}
        initial={editingCliente}
        onClose={() => {
          setOpenForm(false);
          setEditingCliente(null);
        }}
        onSubmit={async (payload) => {
          if (editingCliente) {
            await update(editingCliente.id, payload);
            setClienteSeleccionadoId(editingCliente.id);
          } else {
            const created = await create(payload);
            setClienteSeleccionadoId(created?.id || null);
          }

          setOpenForm(false);
          setEditingCliente(null);
        }}
        submitting={loading}
      />

      <ConfirmModal
        open={openConfirm}
        title="Eliminar cliente"
        description="¿Seguro que deseas eliminar este cliente? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmVariant="danger"
        loading={loading}
        onConfirm={async () => {
          if (!clienteAEliminarId) return;

          await remove(clienteAEliminarId);
          setOpenConfirm(false);
          setClienteAEliminarId(null);
        }}
        onCancel={() => setOpenConfirm(false)}
      />
    </section>
  );
}
