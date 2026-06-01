import { useCallback, useMemo, useState } from "react";
import {
  createEmpleado,
  deleteEmpleado,
  filtrarEmpleados,
  getEmpleadosBase,
  getEmpleadosResumen,
  updateEmpleado,
} from "../services/EmpleadosService.jsx";

export default function useEmpleados() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [loading, setLoading] = useState(false);

  const empleados = getEmpleadosBase();

  const empleadosFiltrados = useMemo(
    () => filtrarEmpleados(empleados, { busqueda, filtroEstado }),
    [empleados, busqueda, filtroEstado],
  );

  const resumen = useMemo(() => getEmpleadosResumen(empleados), [empleados]);

  const create = useCallback(async (payload) => {
    setLoading(true);
    try {
      return createEmpleado(payload);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (empleadoId, patch) => {
    setLoading(true);
    try {
      return updateEmpleado(empleadoId, patch);
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (empleadoId) => {
    setLoading(true);
    try {
      return deleteEmpleado(empleadoId);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    empleados,
    empleadosFiltrados,
    resumen,
    busqueda,
    setBusqueda,
    filtroEstado,
    setFiltroEstado,
    create,
    update,
    remove,
  };
}
