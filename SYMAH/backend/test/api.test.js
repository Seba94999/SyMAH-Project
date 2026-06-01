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
      probabilidad: 50,
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
      fin: "10:00",
      notas: "sin duracion",
    },
  });

  assert.equal(invalid.response.status, 400);
  assert.equal(invalid.data.message, "duracionHoras must be a valid number");
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
