export default function Modal({
  open,
  title,
  icon,
  subtitle,
  children,
  footer,
  onClose,
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="sy-modal__overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <section
        className="sy-modal__panel"
        onClick={(event) => event.stopPropagation()}
      >
        {title ? (
          <header className="sy-modal__header">
            <div>
              <h2 className="sy-summary-card__title">{title}</h2>
              {subtitle ? (
                <p className="sy-modal__subtitle">{subtitle}</p>
              ) : null}
            </div>
            {icon ? <span className="sy-modal__badge">{icon}</span> : null}
          </header>
        ) : null}
        <div className="sy-modal__content">{children}</div>
        {footer ? <footer className="sy-modal__footer">{footer}</footer> : null}
      </section>
    </div>
  );
}
