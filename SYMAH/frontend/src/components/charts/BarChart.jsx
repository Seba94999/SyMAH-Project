export default function BarChart({
  title,
  description,
  data = [],
  className = "",
}) {
  const maxValue = Math.max(1, ...data.map((item) => item.value));

  return (
    <section className={`sy-chart-card ${className}`.trim()}>
      <header className="sy-chart-card__header">
        <div>
          <h2 className="sy-chart-card__title">{title}</h2>
          {description ? (
            <p className="sy-chart-card__description">{description}</p>
          ) : null}
        </div>
      </header>

      <div className="sy-bar-chart" role="img" aria-label={title}>
        {data.map((item, idx) => {
          const height = Math.max((item.value / maxValue) * 100, 8);
          const delay = idx * 80;

          return (
            <article className="sy-bar-chart__item" key={item.label}>
              <div className="sy-bar-chart__track">
                <div
                  className="sy-bar-chart__fill"
                  style={{
                    height: `${height}%`,
                    background: item.color,
                    animationDelay: `${delay}ms`,
                  }}
                />
              </div>
              <strong className="sy-bar-chart__value">
                {item.valueLabel || item.value}
              </strong>
              <span className="sy-bar-chart__label">{item.label}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
