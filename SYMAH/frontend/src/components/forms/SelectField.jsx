import Field from "./Field.jsx";

export default function SelectField({
  label,
  hint,
  error,
  iconLeft,
  iconRight,
  children,
  className = "",
  ...props
}) {
  return (
    <Field label={label} hint={hint} error={error} className={className}>
      <span
        className={`sy-field__input-shell ${iconLeft ? "sy-field__input-shell--left" : ""} ${iconRight ? "sy-field__input-shell--right" : ""}`.trim()}
      >
        {iconLeft ? <span className="sy-field__icon">{iconLeft}</span> : null}
        <select className="sy-select sy-field__input" {...props}>
          {children}
        </select>
        {iconRight ? <span className="sy-field__icon">{iconRight}</span> : null}
      </span>
    </Field>
  );
}
