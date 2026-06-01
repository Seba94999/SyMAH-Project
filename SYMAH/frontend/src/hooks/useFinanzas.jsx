import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createMovimiento,
  deleteMovimiento,
  filtrarMovimientos,
  getFinanzasMovimientos,
  getFinanzasResumen,
  updateMovimiento,
} from "../services/FinanzasService.jsx";

export default function useFinanzas() {
  const [movimientos, setMovimientos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getFinanzasMovimientos();
      setMovimientos(data);
    } catch (loadError) {
      setError(loadError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const movimientosFiltrados = useMemo(
    () => filtrarMovimientos(movimientos, { busqueda, filtroTipo }),
    [movimientos, busqueda, filtroTipo],
  );

  const resumen = useMemo(() => getFinanzasResumen(movimientos), [movimientos]);

  const create = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const created = await createMovimiento(payload);
      setMovimientos((current) => [...current, created]);
      return created;
    } catch (createError) {
      setError(createError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (movimientoId, patch) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await updateMovimiento(movimientoId, patch);
      setMovimientos((current) =>
        current.map((movimiento) =>
          movimiento.id === movimientoId ? updated : movimiento,
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

  const remove = useCallback(async (movimientoId) => {
    setLoading(true);
    setError(null);

    try {
      await deleteMovimiento(movimientoId);
      setMovimientos((current) =>
        current.filter((movimiento) => movimiento.id !== movimientoId),
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
    movimientos,
    movimientosFiltrados,
    resumen,
    busqueda,
    setBusqueda,
    filtroTipo,
    setFiltroTipo,
    create,
    update,
    remove,
  };
}
