import Loader from "../ui/Loader.jsx";

export default function LoadingOverlay({ label = "Procesando" }) {
  return (
    <div
      className="sy-modal__overlay"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <Loader label={label} />
    </div>
  );
}
