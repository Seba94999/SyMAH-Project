import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createEmpleado,
  deleteEmpleado,
  filtrarEmpleados,
  getEmpleadosBase,
  getEmpleadosResumen,
  updateEmpleado,
} from "../services/EmpleadosService.jsx";

export default function useEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getEmpleadosBase();
      setEmpleados(data);
    } catch (loadError) {
      setError(loadError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const empleadosFiltrados = useMemo(
    () => filtrarEmpleados(empleados, { busqueda, filtroEstado }),
    [empleados, busqueda, filtroEstado],
  );

  const resumen = useMemo(() => getEmpleadosResumen(empleados), [empleados]);

  const create = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const created = await createEmpleado(payload);
      setEmpleados((current) => [...current, created]);
      return created;
    } catch (createError) {
      setError(createError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (empleadoId, patch) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await updateEmpleado(empleadoId, patch);
      setEmpleados((current) =>
        current.map((empleado) =>
          empleado.id === empleadoId ? updated : empleado,
        ),
      );
      return updated;
    } catch (updateError) {
      setError(updateError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (empleadoId) => {
    setLoading(true);
    setError(null);

    try {
      await deleteEmpleado(empleadoId);
      setEmpleados((current) =>
        current.filter((empleado) => empleado.id !== empleadoId),
      );
      return true;
    } catch (deleteError) {
      setError(deleteError);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    reload: load,
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
