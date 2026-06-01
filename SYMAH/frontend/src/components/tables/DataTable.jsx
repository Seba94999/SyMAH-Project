import EmptyState from "../ui/EmptyState.jsx";
import Loader from "../ui/Loader.jsx";

export default function DataTable({
  columns = [],
  data = [],
  rowKey = (row) => row.id,
  loading = false,
  emptyTitle = "Sin registros",
  emptyDescription = "No hay datos para mostrar.",
  onRowClick,
  renderRowActions,
  selectedRowId,
}) {
  const hasActions = typeof renderRowActions === "function";
  const visibleColumns = [...columns];

  return (
    <div className="sy-table__wrapper">
      <table className="sy-table">
        <thead>
          <tr>
            {visibleColumns.map((column) => (
              <th
                key={column.key || column.label}
                style={{ textAlign: column.align || "left" }}
              >
                {column.label}
              </th>
            ))}
            {hasActions ? (
              <th style={{ textAlign: "right" }}>Acciones</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                className="sy-table__state"
                colSpan={visibleColumns.length + (hasActions ? 1 : 0)}
              >
                <Loader label="Cargando tabla" />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                className="sy-table__state"
                colSpan={visibleColumns.length + (hasActions ? 1 : 0)}
              >
                <EmptyState title={emptyTitle} description={emptyDescription} />
              </td>
            </tr>
          ) : (
            data.map((row) => {
              const key = rowKey(row);
              const isSelected = selectedRowId != null && key === selectedRowId;

              return (
                <tr
                  key={key}
                  className={isSelected ? "is-selected" : ""}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {visibleColumns.map((column) => (
                    <td
                      key={column.key || column.label}
                      style={{ textAlign: column.align || "left" }}
                    >
                      {typeof column.render === "function"
                        ? column.render(row)
                        : row[column.key]}
                    </td>
                  ))}
                  {hasActions ? (
                    <td style={{ textAlign: "right" }}>
                      {renderRowActions(row)}
                    </td>
                  ) : null}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
