export default function Card({
  as: Component = "article",
  className = "",
  children,
  ...props
}) {
  return (
    <Component className={`sy-card ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
