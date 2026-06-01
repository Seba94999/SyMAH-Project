import { useCallback, useMemo, useState } from "react";
import {
  createCliente,
  deleteCliente,
  filtrarClientes,
  getClientesBase,
  getClientesResumen,
  updateCliente,
} from "../services/ClientesService.jsx";

export default function useClientes() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [loading, setLoading] = useState(false);

  const clientes = getClientesBase();

  const clientesFiltrados = useMemo(
    () => filtrarClientes(clientes, { busqueda, filtroEstado }),
    [clientes, busqueda, filtroEstado],
  );

  const resumen = useMemo(() => getClientesResumen(clientes), [clientes]);

  const create = useCallback(async (payload) => {
    setLoading(true);
    try {
      return createCliente(payload);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (clienteId, patch) => {
    setLoading(true);
    try {
      return updateCliente(clienteId, patch);
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (clienteId) => {
    setLoading(true);
    try {
      return deleteCliente(clienteId);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
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
