import Button from "./Button.jsx";

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <section className={`sy-empty-state ${className}`.trim()}>
      <h3 className="sy-empty-state__title">{title}</h3>
      {description ? (
        <p className="sy-empty-state__description">{description}</p>
      ) : null}
      {actionLabel ? (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </section>
  );
}
