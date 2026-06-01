import { useEffect, useMemo, useState } from "react";

const PIE_CENTER = 60;
const PIE_RADIUS = 42;

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describePieSlice(centerX, centerY, radius, startAngle, endAngle) {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    `M ${centerX} ${centerY}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

export default function DonutChart({
  title,
  description,
  data = [],
  totalLabel = "Total",
  formatValue = (value) => String(value),
  className = "",
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));

    return () => cancelAnimationFrame(frame);
  }, [data]);

  const segments = useMemo(() => {
    let accumulated = 0;

    return data.map((item, index) => {
      const sliceAngle = (item.value / total) * 360;
      const startAngle = accumulated;
      const endAngle = accumulated + sliceAngle;
      accumulated += sliceAngle;

      return {
        ...item,
        index,
        path: describePieSlice(
          PIE_CENTER,
          PIE_CENTER,
          PIE_RADIUS,
          startAngle,
          endAngle,
        ),
      };
    });
  }, [data, total]);

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

      <div className="sy-donut-chart">
        <div className="sy-donut-chart__figure" role="img" aria-label={title}>
          <svg className="sy-donut-chart__svg" viewBox="0 0 120 120">
            {segments.map((item) => (
              <path
                key={item.label}
                d={item.path}
                fill={item.color}
                stroke={item.color}
                strokeWidth="0"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "scale(1)" : "scale(0.85)",
                  transformOrigin: "60px 60px",
                  transformBox: "fill-box",
                  transitionDelay: `${item.index * 90}ms`,
                }}
              />
            ))}
          </svg>

          <div className="sy-donut-chart__center sy-donut-chart__center--floating">
            <strong className="sy-donut-chart__center-value">
              {formatValue(total)}
            </strong>
            <span className="sy-donut-chart__center-label">{totalLabel}</span>
          </div>
        </div>

        <div className="sy-donut-chart__legend">
          {data.map((item) => {
            const percentage = Math.round((item.value / total) * 100);

            return (
              <div className="sy-donut-chart__legend-item" key={item.label}>
                <div className="sy-donut-chart__legend-label">
                  <span
                    className="sy-donut-chart__dot"
                    style={{ background: item.color }}
                  />
                  <span>{item.label}</span>
                </div>
                <strong>
                  {item.valueLabel || item.value} · {percentage}%
                </strong>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
