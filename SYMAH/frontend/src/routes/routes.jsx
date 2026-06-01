import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout.jsx";
import DashboardPage from "../pages/dashboard/Dashboard.jsx";
import ClientesPage from "../pages/clientes/ClientesPage.jsx";
import EmpleadosPage from "../pages/empleados/EmpleadosPage.jsx";
import TrabajosPage from "../pages/trabajos/TrabajosPage.jsx";
import FinanzasPage from "../pages/finanzas/FinanzasPage.jsx";
import PresupuestosPage from "../pages/presupuestos/PresupuestosPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="clientes" element={<ClientesPage />} />
        <Route path="empleados" element={<EmpleadosPage />} />
        <Route path="trabajos" element={<TrabajosPage />} />
        <Route path="finanzas" element={<FinanzasPage />} />
        <Route path="presupuestos" element={<PresupuestosPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
