import { useCallback, useMemo, useState } from "react";
import {
  createTrabajo,
  deleteTrabajo,
  filtrarTrabajos,
  getTrabajosBase,
  getTrabajosResumen,
  updateTrabajo,
} from "../services/TrabajosService.jsx";

export default function useTrabajos() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [loading, setLoading] = useState(false);

  const trabajos = getTrabajosBase();

  const trabajosFiltrados = useMemo(
    () => filtrarTrabajos(trabajos, { busqueda, filtroEstado }),
    [trabajos, busqueda, filtroEstado],
  );

  const resumen = useMemo(() => getTrabajosResumen(trabajos), [trabajos]);

  const create = useCallback(async (payload) => {
    setLoading(true);
    try {
      return createTrabajo(payload);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (trabajoId, patch) => {
    setLoading(true);
    try {
      return updateTrabajo(trabajoId, patch);
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (trabajoId) => {
    setLoading(true);
    try {
      return deleteTrabajo(trabajoId);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
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
