export default function Alert({
  variant = "info",
  title,
  children,
  className = "",
}) {
  return (
    <section className={`sy-alert sy-alert--${variant} ${className}`.trim()}>
      {title ? <h3 className="sy-alert__title">{title}</h3> : null}
      {children ? <p className="sy-alert__description">{children}</p> : null}
    </section>
  );
}
