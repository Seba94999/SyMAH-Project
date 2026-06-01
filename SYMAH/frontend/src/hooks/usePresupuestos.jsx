import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createPresupuesto,
  deletePresupuesto,
  filtrarPresupuestos,
  getPresupuestosBase,
  getPresupuestosResumen,
  updatePresupuesto,
} from "../services/PresupuestosService.jsx";

export default function usePresupuestos() {
  const [presupuestos, setPresupuestos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPresupuestosBase();
      setPresupuestos(data);
    } catch (loadError) {
      setError(loadError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const presupuestosFiltrados = useMemo(
    () => filtrarPresupuestos(presupuestos, { busqueda, filtroEstado }),
    [presupuestos, busqueda, filtroEstado],
  );

  const resumen = useMemo(
    () => getPresupuestosResumen(presupuestos),
    [presupuestos],
  );

  const create = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const created = await createPresupuesto(payload);
      setPresupuestos((current) => [...current, created]);
      return created;
    } catch (createError) {
      setError(createError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (presupuestoId, patch) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await updatePresupuesto(presupuestoId, patch);
      setPresupuestos((current) =>
        current.map((presupuesto) =>
          presupuesto.id === presupuestoId ? updated : presupuesto,
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

  const remove = useCallback(async (presupuestoId) => {
    setLoading(true);
    setError(null);

    try {
      await deletePresupuesto(presupuestoId);
      setPresupuestos((current) =>
        current.filter((presupuesto) => presupuesto.id !== presupuestoId),
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
    presupuestos,
    presupuestosFiltrados,
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
