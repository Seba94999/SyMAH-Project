import { Link } from "react-router-dom";

export default function Breadcrumbs({ items = [] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="sy-breadcrumbs" aria-label="Breadcrumbs">
      {items.map((item, index) => (
        <li className="sy-breadcrumbs__item" key={`${item.label}-${index}`}>
          {item.to ? (
            <Link className="sy-breadcrumbs__link" to={item.to}>
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
