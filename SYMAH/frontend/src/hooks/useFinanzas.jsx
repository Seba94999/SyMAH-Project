import { useCallback, useMemo, useState } from "react";
import {
  createMovimiento,
  deleteMovimiento,
  filtrarMovimientos,
  getFinanzasMovimientos,
  getFinanzasResumen,
  updateMovimiento,
} from "../services/FinanzasService.jsx";

export default function useFinanzas() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [loading, setLoading] = useState(false);

  const movimientos = getFinanzasMovimientos();

  const movimientosFiltrados = useMemo(
    () => filtrarMovimientos(movimientos, { busqueda, filtroTipo }),
    [movimientos, busqueda, filtroTipo],
  );

  const resumen = useMemo(() => getFinanzasResumen(movimientos), [movimientos]);

  const create = useCallback(async (payload) => {
    setLoading(true);
    try {
      return createMovimiento(payload);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (movimientoId, patch) => {
    setLoading(true);
    try {
      return updateMovimiento(movimientoId, patch);
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (movimientoId) => {
    setLoading(true);
    try {
      return deleteMovimiento(movimientoId);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
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
