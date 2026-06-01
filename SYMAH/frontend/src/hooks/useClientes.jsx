import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createCliente,
  deleteCliente,
  filtrarClientes,
  getClientesBase,
  getClientesResumen,
  updateCliente,
} from "../services/ClientesService.jsx";

export default function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getClientesBase();
      setClientes(data);
    } catch (loadError) {
      setError(loadError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const clientesFiltrados = useMemo(
    () => filtrarClientes(clientes, { busqueda, filtroEstado }),
    [clientes, busqueda, filtroEstado],
  );

  const resumen = useMemo(() => getClientesResumen(clientes), [clientes]);

  const create = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const created = await createCliente(payload);
      setClientes((current) => [...current, created]);
      return created;
    } catch (createError) {
      setError(createError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (clienteId, patch) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await updateCliente(clienteId, patch);
      setClientes((current) =>
        current.map((cliente) =>
          cliente.id === clienteId ? updated : cliente,
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

  const remove = useCallback(async (clienteId) => {
    setLoading(true);
    setError(null);

    try {
      await deleteCliente(clienteId);
      setClientes((current) =>
        current.filter((cliente) => cliente.id !== clienteId),
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
    clientes,
    clientesFiltrados,
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
