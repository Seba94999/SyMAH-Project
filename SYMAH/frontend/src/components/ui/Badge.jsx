const BADGE_VARIANTS = {
  neutral: "sy-badge--neutral",
  primary: "sy-badge--primary",
  success: "sy-badge--success",
  warning: "sy-badge--warning",
  danger: "sy-badge--danger",
};

export default function Badge({
  variant = "neutral",
  className = "",
  children,
  ...props
}) {
  const variantClass = BADGE_VARIANTS[variant] || BADGE_VARIANTS.neutral;

  return (
    <span className={`sy-badge ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
