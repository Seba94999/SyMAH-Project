export default function Loader({ label = "Cargando" }) {
  return (
    <div
      className="sy-loader"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className="sy-loader__spinner" aria-hidden="true" />
    </div>
  );
}
