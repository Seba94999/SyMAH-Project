import Card from "../ui/Card.jsx";

const CARD_VARIANTS = {
  primary: "sy-summary-card--primary",
  success: "sy-summary-card--success",
  warning: "sy-summary-card--warning",
  danger: "sy-summary-card--danger",
};

export default function SummaryCard({
  title,
  value,
  description,
  variant = "primary",
}) {
  return (
    <Card
      className={`sy-summary-card ${CARD_VARIANTS[variant] || CARD_VARIANTS.primary}`.trim()}
    >
      <h3 className="sy-summary-card__title">{title}</h3>
      <p className="sy-summary-card__value">{value}</p>
      {description ? (
        <p className="sy-summary-card__description">{description}</p>
      ) : null}
    </Card>
  );
}
