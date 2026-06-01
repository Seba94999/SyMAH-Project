import { useCallback, useEffect, useMemo, useState } from "react";
import * as JornadasService from "../services/JornadasService.jsx";

export default function useJornadas(empleadoId) {
  const [jornadas, setJornadas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtroMes, setFiltroMes] = useState("todos");
  const [filtroAnio, setFiltroAnio] = useState("todos");

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    // Simular llamada asíncrona
    setTimeout(() => {
      try {
        const data = JornadasService.getJornadasByEmpleado(empleadoId || "");
        setJornadas(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }, 120);
  }, [empleadoId]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setFiltroMes("todos");
    setFiltroAnio("todos");
  }, [empleadoId]);

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
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const nuevo = JornadasService.createJornada(payload);
          setJornadas((s) => [...s, nuevo]);
          resolve(nuevo);
        } catch (e) {
          setError(e);
          resolve(null);
        } finally {
          setLoading(false);
        }
      }, 180);
    });
  }, []);

  const update = useCallback(async (id, patch) => {
    setLoading(true);
    setError(null);
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const updated = JornadasService.updateJornada(id, patch);
          setJornadas((s) => s.map((j) => (j.id === id ? updated : j)));
          resolve(updated);
        } catch (e) {
          setError(e);
          resolve(null);
        } finally {
          setLoading(false);
        }
      }, 180);
    });
  }, []);

  const remove = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const ok = JornadasService.deleteJornada(id);
          if (ok) setJornadas((s) => s.filter((j) => j.id !== id));
          resolve(ok);
        } catch (e) {
          setError(e);
          resolve(false);
        } finally {
          setLoading(false);
        }
      }, 160);
    });
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
    listarTrabajosParaSelect: JornadasService.listarTrabajosParaSelect,
  };
}
