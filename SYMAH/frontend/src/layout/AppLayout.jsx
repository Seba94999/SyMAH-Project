import { NavLink, Outlet } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/clientes", label: "Clientes" },
  { to: "/empleados", label: "Empleados" },
  { to: "/trabajos", label: "Trabajos" },
  { to: "/finanzas", label: "Finanzas" },
  { to: "/presupuestos", label: "Presupuestos" },
];

export default function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__brand">
          <img src="/assets/logo.png" alt="SYMAH" />
          <div>
            <strong className="app-shell__brand-title">SYMAH</strong>
            <p className="app-shell__brand-caption">
              Panel administrativo central
            </p>
          </div>
        </div>

        <nav className="app-shell__nav" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive
                  ? "app-shell__nav-link is-active"
                  : "app-shell__nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-shell__main">
        <div className="app-shell__content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
