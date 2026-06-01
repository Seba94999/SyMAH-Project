import Button from "../ui/Button.jsx";

export default function TablePagination({
  page = 1,
  totalPages = 1,
  onPageChange,
}) {
  return (
    <div className="sy-pagination">
      <span>
        Página {page} de {totalPages}
      </span>
      <div className="sy-pagination__group">
        <Button
          variant="secondary"
          onClick={() => onPageChange?.(page - 1)}
          disabled={page <= 1}
        >
          Anterior
        </Button>
        <Button
          variant="secondary"
          onClick={() => onPageChange?.(page + 1)}
          disabled={page >= totalPages}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
