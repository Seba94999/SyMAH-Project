export default function MetricsGrid({ children, className = "" }) {
  return (
    <section className={`sy-summary-grid ${className}`.trim()}>
      {children}
    </section>
  );
}
