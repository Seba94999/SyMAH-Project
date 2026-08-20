import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createTransaccion,
  deleteTransaccion,
  filtrarMovimientos,
  getTransacciones,
  getFinanzasResumen,
  updateTransaccion,
} from "../services/FinanzasService.jsx";

const TRABAJOS_SYNC_EVENT = "symah:trabajos-sync";
const TRANSACCIONES_SYNC_EVENT = "symah:transacciones-sync";

function notifyTrabajosChanged() {
  window.dispatchEvent(new CustomEvent(TRABAJOS_SYNC_EVENT));
}

function notifyTransaccionesChanged() {
  window.dispatchEvent(new CustomEvent(TRANSACCIONES_SYNC_EVENT));
}

export default function useFinanzas() {
  const [transacciones, setTransacciones] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTransacciones();
      setTransacciones(data);
    } catch (loadError) {
      setError(loadError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const transaccionesFiltradas = useMemo(
    () => filtrarMovimientos(transacciones, { busqueda, filtroTipo }),
    [transacciones, busqueda, filtroTipo],
  );

  const resumen = useMemo(
    () => getFinanzasResumen(transacciones),
    [transacciones],
  );

  const create = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const created = await createTransaccion(payload);
      setTransacciones((current) => [...current, created]);
      notifyTransaccionesChanged();
      notifyTrabajosChanged();
      return created;
    } catch (createError) {
      setError(createError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (transaccionId, patch) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await updateTransaccion(transaccionId, patch);
      setTransacciones((current) =>
        current.map((transaccion) =>
          transaccion.id === transaccionId ? updated : transaccion,
        ),
      );
      notifyTransaccionesChanged();
      notifyTrabajosChanged();
      return updated;
    } catch (updateError) {
      setError(updateError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (transaccionId) => {
    setLoading(true);
    setError(null);

    try {
      await deleteTransaccion(transaccionId);
      setTransacciones((current) =>
        current.filter((transaccion) => transaccion.id !== transaccionId),
      );
      notifyTransaccionesChanged();
      notifyTrabajosChanged();
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
    transacciones,
    transaccionesFiltradas,
    movimientos: transacciones,
    movimientosFiltrados: transaccionesFiltradas,
    transaccionesResumen: resumen,
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
