import Field from "./Field.jsx";

export default function TextAreaField({
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
        className={`sy-field__input-shell sy-field__input-shell--textarea ${iconLeft ? "sy-field__input-shell--left" : ""} ${iconRight ? "sy-field__input-shell--right" : ""}`.trim()}
      >
        {iconLeft ? <span className="sy-field__icon">{iconLeft}</span> : null}
        <textarea className="sy-textarea sy-field__input" {...props} />
        {iconRight ? <span className="sy-field__icon">{iconRight}</span> : null}
      </span>
    </Field>
  );
}
