import Field from "./Field.jsx";

export default function TextField({
  label,
  hint,
  error,
  iconLeft,
  iconRight,
  className = "",
  ...props
}) {
  return (
    <Field label={label} hint={hint} error={error} className={className}>
      <span
        className={`sy-field__input-shell ${iconLeft ? "sy-field__input-shell--left" : ""} ${iconRight ? "sy-field__input-shell--right" : ""}`.trim()}
      >
        {iconLeft ? <span className="sy-field__icon">{iconLeft}</span> : null}
        <input className="sy-input sy-field__input" {...props} />
        {iconRight ? <span className="sy-field__icon">{iconRight}</span> : null}
      </span>
    </Field>
  );
}
