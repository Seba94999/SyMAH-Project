import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createTrabajo,
  deleteTrabajo,
  filtrarTrabajos,
  getTrabajosBase,
  getTrabajosResumen,
  updateTrabajo,
} from "../services/TrabajosService.jsx";

export default function useTrabajos() {
  const [trabajos, setTrabajos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTrabajosBase();
      setTrabajos(data);
    } catch (loadError) {
      setError(loadError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const trabajosFiltrados = useMemo(
    () => filtrarTrabajos(trabajos, { busqueda, filtroEstado }),
    [trabajos, busqueda, filtroEstado],
  );

  const resumen = useMemo(() => getTrabajosResumen(trabajos), [trabajos]);

  const create = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const created = await createTrabajo(payload);
      setTrabajos((current) => [...current, created]);
      return created;
    } catch (createError) {
      setError(createError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (trabajoId, patch) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await updateTrabajo(trabajoId, patch);
      setTrabajos((current) =>
        current.map((trabajo) =>
          trabajo.id === trabajoId ? updated : trabajo,
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

  const remove = useCallback(async (trabajoId) => {
    setLoading(true);
    setError(null);

    try {
      await deleteTrabajo(trabajoId);
      setTrabajos((current) =>
        current.filter((trabajo) => trabajo.id !== trabajoId),
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
    trabajos,
    trabajosFiltrados,
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
