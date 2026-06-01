import { useCallback, useMemo, useState } from "react";
import {
  createPresupuesto,
  deletePresupuesto,
  filtrarPresupuestos,
  getPresupuestosBase,
  getPresupuestosResumen,
  updatePresupuesto,
} from "../services/PresupuestosService.jsx";

export default function usePresupuestos() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [loading, setLoading] = useState(false);

  const presupuestos = getPresupuestosBase();

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
    try {
      return createPresupuesto(payload);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (presupuestoId, patch) => {
    setLoading(true);
    try {
      return updatePresupuesto(presupuestoId, patch);
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (presupuestoId) => {
    setLoading(true);
    try {
      return deletePresupuesto(presupuestoId);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
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
