const assert = require("node:assert/strict");
const test = require("node:test");

const app = require("../src/app");

let server;
let baseUrl;

const ENTITY_CASES = [
  {
    name: "clientes",
    path: "/clientes",
    createPayload: {
      nombre: "Cliente Smoke",
      rubro: "Servicios",
      ciudad: "Santiago",
      estado: "activo",
      contacto: "Tester",
      correo: "smoke@x.com",
      telefono: "123",
      ultimoTrabajo: "-",
      balancePendiente: 0,
    },
    updatePayload: { ciudad: "Valdivia" },
    assertCreated(item) {
      assert.equal(item.nombre, "Cliente Smoke");
      assert.equal(item.ciudad, "Santiago");
    },
    assertUpdated(item) {
      assert.equal(item.ciudad, "Valdivia");
    },
  },
  {
    name: "empleados",
    path: "/empleados",
    createPayload: {
      nombre: "Emp Smoke",
      cargo: "Tecnico",
      sede: "Santiago",
      estado: "activo",
      jornada: "Completa",
      salario: 1000,
      horasMes: 40,
      ultimaActividad: "Alta",
    },
    updatePayload: { sede: "Temuco" },
    assertCreated(item) {
      assert.equal(item.nombre, "Emp Smoke");
      assert.equal(item.sede, "Santiago");
    },
    assertUpdated(item) {
      assert.equal(item.sede, "Temuco");
    },
  },
  {
    name: "trabajos",
    path: "/trabajos",
    createPayload: {
      nombre: "Trabajo Smoke",
      cliente: "Cliente Smoke",
      responsable: "Ana",
      estado: "enCurso",
      prioridad: "Media",
      progreso: 10,
      monto: 1000,
      ultimaActualizacion: "2026-06-01",
    },
    updatePayload: { progreso: 20 },
    assertCreated(item) {
      assert.equal(item.nombre, "Trabajo Smoke");
      assert.equal(item.progreso, 10);
    },
    assertUpdated(item) {
      assert.equal(item.progreso, 20);
    },
  },
  {
    name: "presupuestos",
    path: "/presupuestos",
    createPayload: {
      cliente: "Cliente Smoke",
      descripcion: "Desc",
      estado: "pendiente",
      fecha: "2026-06-01",
      monto: 2000,
      clienteRegistrado: true,
      trabajoVinculado: null,
    },
    updatePayload: { estado: "aprobado" },
    assertCreated(item) {
      assert.equal(item.cliente, "Cliente Smoke");
      assert.equal(item.estado, "pendiente");
    },
    assertUpdated(item) {
      assert.equal(item.estado, "aprobado");
    },
  },
  {
    name: "finanzas",
    path: "/finanzas",
    createPayload: {
      tipo: "ingreso",
      concepto: "Ingreso Smoke",
      referencia: "REF",
      fecha: "2026-06-01",
      monto: 3000,
    },
    updatePayload: { monto: 3500 },
    assertCreated(item) {
      assert.equal(item.concepto, "Ingreso Smoke");
      assert.equal(item.monto, 3000);
    },
    assertUpdated(item) {
      assert.equal(item.monto, 3500);
    },
  },
  {
    name: "transacciones",
    path: "/transacciones",
    createPayload: {
      tipo: "cobro",
      concepto: "Cobro Smoke",
      referencia: "TR-001",
      entidadOrigen: "trabajo",
      entidadOrigenId: "TR-001",
      entidadDestino: "caja",
      fecha: "2026-06-01",
      monto: 3000,
    },
    updatePayload: { monto: 3500 },
    assertCreated(item) {
      assert.equal(item.concepto, "Cobro Smoke");
      assert.equal(item.monto, 3000);
    },
    assertUpdated(item) {
      assert.equal(item.monto, 3500);
    },
  },
];

async function request(path, { method = "GET", body } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let data = null;

  if (text.length > 0) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  return { response, data };
}

async function startServer() {
  server = app.listen(0);

  await new Promise((resolve) => {
    server.once("listening", resolve);
  });

  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}/api`;
}

async function stopServer() {
  if (!server) {
    return;
  }

  await new Promise((resolve) => {
    server.close(resolve);
  });
}

test.before(startServer);
test.after(stopServer);

test("health endpoint responds ok", async () => {
  const { response, data } = await request("/health");

  assert.equal(response.status, 200);
  assert.deepEqual(data, { status: "ok", service: "symah-backend" });
});

test("CRUD endpoints work for main backend entities", async () => {
  for (const entityCase of ENTITY_CASES) {
    const created = await request(entityCase.path, {
      method: "POST",
      body: entityCase.createPayload,
    });

    assert.equal(created.response.status, 201);
    assert.ok(created.data.id);
    entityCase.assertCreated(created.data);

    const id = created.data.id;

    const readById = await request(`${entityCase.path}/${id}`);
    assert.equal(readById.response.status, 200);
    assert.equal(readById.data.id, id);

    const updated = await request(`${entityCase.path}/${id}`, {
      method: "PATCH",
      body: entityCase.updatePayload,
    });

    assert.equal(updated.response.status, 200);
    assert.equal(updated.data.id, id);
    entityCase.assertUpdated(updated.data);

    const deleted = await request(`${entityCase.path}/${id}`, {
      method: "DELETE",
    });

    assert.equal(deleted.response.status, 204);

    const afterDelete = await request(`${entityCase.path}/${id}`);
    assert.equal(afterDelete.response.status, 404);
  }
});

test("jornadas validates required fields", async () => {
  const invalid = await request("/jornadas", {
    method: "POST",
    body: {
      empleadoId: "EMP-001",
      trabajoId: "TR-001",
      fecha: "2026-06-01",
      inicio: "08:00",
      notas: "sin hora de fin",
    },
  });

  assert.equal(invalid.response.status, 400);
  assert.equal(invalid.data.message, "fin must be a string");
});

test("jornadas CRUD works through the backend router", async () => {
  const created = await request("/jornadas", {
    method: "POST",
    body: {
      empleadoId: "EMP-001",
      trabajoId: "TR-001",
      fecha: "2026-06-01",
      inicio: "08:00",
      fin: "10:00",
      duracionHoras: 2,
      notas: "ok",
    },
  });

  assert.equal(created.response.status, 201);
  assert.ok(created.data.id);

  const id = created.data.id;

  const updated = await request(`/jornadas/${id}`, {
    method: "PATCH",
    body: { notas: "upd" },
  });

  assert.equal(updated.response.status, 200);
  assert.equal(updated.data.notas, "upd");

  const deleted = await request(`/jornadas/${id}`, {
    method: "DELETE",
  });

  assert.equal(deleted.response.status, 204);
});

test("trabajos exposes labor cost and charged traceability", async () => {
  const trabajo = await request("/trabajos", {
    method: "POST",
    body: {
      nombre: "Trabajo Trazable",
      cliente: "Cliente Smoke",
      responsable: "Ana Torres",
      estado: "enCurso",
      prioridad: "Media",
      progreso: 30,
      monto: 10000,
      ultimaActualizacion: "2026-06-01",
    },
  });

  assert.equal(trabajo.response.status, 201);
  const trabajoId = trabajo.data.id;

  const jornada = await request("/jornadas", {
    method: "POST",
    body: {
      empleadoId: "EMP-001",
      trabajoId,
      fecha: "2026-06-02",
      inicio: "08:00",
      fin: "09:00",
      notas: "mano de obra trazable",
    },
  });

  assert.equal(jornada.response.status, 201);

  const cobro = await request("/transacciones", {
    method: "POST",
    body: {
      tipo: "cobro",
      concepto: "Cobro trazable",
      referencia: trabajoId,
      entidadOrigen: "trabajo",
      entidadOrigenId: trabajoId,
      entidadDestino: "caja",
      cliente: "Cliente Smoke",
      fecha: "2026-06-03",
      monto: 2500,
    },
  });

  assert.equal(cobro.response.status, 201);

  const traced = await request(`/trabajos/${trabajoId}`);

  assert.equal(traced.response.status, 200);
  assert.equal(traced.data.gastoManoObra, 7000);
  assert.equal(traced.data.cobrado, 2500);
  assert.equal(traced.data.saldoPorCobrar, 7500);
  assert.equal(traced.data.trazabilidad.totalJornadas, 1);
  assert.equal(traced.data.trazabilidad.totalMovimientosCobro, 1);
});

test("trabajos accumulates charged amount from linked cobro movements", async () => {
  const trabajo = await request("/trabajos", {
    method: "POST",
    body: {
      nombre: "Trabajo Cobros Acumulados",
      cliente: "Cliente Cobros",
      responsable: "Ana Torres",
      estado: "enCurso",
      prioridad: "Media",
      progreso: 50,
      monto: 20000,
      ultimaActualizacion: "2026-06-05",
    },
  });

  assert.equal(trabajo.response.status, 201);
  const trabajoId = trabajo.data.id;

  const primerCobro = await request("/transacciones", {
    method: "POST",
    body: {
      tipo: "cobro",
      concepto: "Primer cobro",
      referencia: trabajoId,
      entidadOrigen: "trabajo",
      entidadOrigenId: trabajoId,
      entidadDestino: "caja",
      cliente: "Cliente Cobros",
      fecha: "2026-06-06",
      monto: 3000,
    },
  });

  assert.equal(primerCobro.response.status, 201);

  const segundoCobro = await request("/transacciones", {
    method: "POST",
    body: {
      tipo: "cobro",
      concepto: "Segundo cobro",
      referencia: trabajoId,
      entidadOrigen: "trabajo",
      entidadOrigenId: trabajoId,
      entidadDestino: "caja",
      cliente: "Cliente Cobros",
      fecha: "2026-06-07",
      monto: 4000,
    },
  });

  assert.equal(segundoCobro.response.status, 201);

  const conDosCobros = await request(`/trabajos/${trabajoId}`);
  assert.equal(conDosCobros.data.cobrado, 7000);
  assert.equal(conDosCobros.data.saldoPorCobrar, 13000);

  const cobroEditado = await request(`/transacciones/${segundoCobro.data.id}`, {
    method: "PATCH",
    body: { monto: 5000 },
  });

  assert.equal(cobroEditado.response.status, 200);

  const despuesDeEditar = await request(`/trabajos/${trabajoId}`);
  assert.equal(despuesDeEditar.data.cobrado, 8000);
  assert.equal(despuesDeEditar.data.saldoPorCobrar, 12000);

  const cobroEliminado = await request(
    `/transacciones/${primerCobro.data.id}`,
    {
      method: "DELETE",
    },
  );

  assert.equal(cobroEliminado.response.status, 204);

  const despuesDeEliminar = await request(`/trabajos/${trabajoId}`);
  assert.equal(despuesDeEliminar.data.cobrado, 5000);
  assert.equal(despuesDeEliminar.data.saldoPorCobrar, 15000);
});
