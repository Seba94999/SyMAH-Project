import { useCallback, useEffect, useMemo, useState } from "react";
import * as JornadasService from "../services/JornadasService.jsx";

export default function useJornadas(empleadoId) {
  const [jornadas, setJornadas] = useState([]);
  const [trabajosOptions, setTrabajosOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtroMes, setFiltroMes] = useState("todos");
  const [filtroAnio, setFiltroAnio] = useState("todos");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (!empleadoId) {
        setJornadas([]);
        return;
      }

      const data = await JornadasService.getJornadasByEmpleado(empleadoId);
      setJornadas(data);
    } catch (loadError) {
      setError(loadError);
    } finally {
      setLoading(false);
    }
  }, [empleadoId]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setFiltroMes("todos");
    setFiltroAnio("todos");
  }, [empleadoId]);

  useEffect(() => {
    let mounted = true;

    async function loadTrabajosOptions() {
      try {
        const options = await JornadasService.listarTrabajosParaSelect();
        if (mounted) {
          setTrabajosOptions(options);
        }
      } catch {
        if (mounted) {
          setTrabajosOptions([]);
        }
      }
    }

    loadTrabajosOptions();

    return () => {
      mounted = false;
    };
  }, []);

  const jornadasFiltradas = useMemo(
    () =>
      JornadasService.filtrarJornadasPorMesYAnio(jornadas, {
        mes: filtroMes,
        anio: filtroAnio,
      }),
    [jornadas, filtroMes, filtroAnio],
  );

  const aniosDisponibles = useMemo(() => {
    const anios = new Set(
      jornadas.map((jornada) =>
        new Date(`${jornada.fecha}T00:00:00`).getFullYear(),
      ),
    );

    return Array.from(anios)
      .sort((a, b) => b - a)
      .map((anio) => ({ value: String(anio), label: String(anio) }));
  }, [jornadas]);

  const mesesDisponibles = [
    { value: "todos", label: "Todos" },
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Mayo" },
    { value: "6", label: "Junio" },
    { value: "7", label: "Julio" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  const create = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const nuevo = await JornadasService.createJornada(payload);
      setJornadas((s) => [...s, nuevo]);
      return nuevo;
    } catch (createError) {
      setError(createError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id, patch) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await JornadasService.updateJornada(id, patch);
      setJornadas((s) => s.map((j) => (j.id === id ? updated : j)));
      return updated;
    } catch (updateError) {
      setError(updateError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const ok = await JornadasService.deleteJornada(id);
      if (ok) setJornadas((s) => s.filter((j) => j.id !== id));
      return ok;
    } catch (deleteError) {
      setError(deleteError);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    jornadas,
    jornadasFiltradas,
    loading,
    error,
    reload: load,
    filtroMes,
    setFiltroMes,
    filtroAnio,
    setFiltroAnio,
    mesesDisponibles,
    aniosDisponibles,
    create,
    update,
    remove,
    trabajosOptions,
  };
}
