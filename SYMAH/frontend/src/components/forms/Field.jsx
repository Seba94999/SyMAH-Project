export default function Field({
  label,
  hint,
  error,
  children,
  className = "",
}) {
  return (
    <label className={`sy-field ${className}`.trim()}>
      {label ? <span className="sy-field__label">{label}</span> : null}
      <span className="sy-field__control">{children}</span>
      {hint ? <span className="sy-field__help">{hint}</span> : null}
      {error ? <span className="sy-field__error">{error}</span> : null}
    </label>
  );
}
