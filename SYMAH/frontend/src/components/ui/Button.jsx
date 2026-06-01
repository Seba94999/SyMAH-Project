export default function Button({
  variant = "primary",
  loading = false,
  className = "",
  children,
  iconLeft,
  iconRight,
  ariaLabel,
  type = "button",
  ...props
}) {
  const hasLabel =
    children !== null &&
    children !== undefined &&
    children !== false &&
    children !== "";

  return (
    <button
      type={type}
      className={`sy-button sy-button--${variant} ${className}`.trim()}
      disabled={loading || props.disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {loading ? (
        <span className="sy-button__spinner" aria-hidden="true" />
      ) : null}
      {!loading && iconLeft ? (
        <span className="sy-button__icon" aria-hidden="true">
          {iconLeft}
        </span>
      ) : null}
      {hasLabel ? <span className="sy-button__label">{children}</span> : null}
      {!loading && iconRight ? (
        <span className="sy-button__icon" aria-hidden="true">
          {iconRight}
        </span>
      ) : null}
    </button>
  );
}
