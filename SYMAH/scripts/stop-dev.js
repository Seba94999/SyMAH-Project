const { execSync } = require("node:child_process");

const TARGET_PORTS = [3000, 5173, 5174, 5175, 5176];

function getPidsByPort(port) {
  try {
    const output = execSync(`netstat -ano -p tcp | findstr :${port}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });

    const lines = output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const pids = new Set();

    for (const line of lines) {
      const columns = line.split(/\s+/);
      const localAddress = columns[1] || "";
      const pid = columns[columns.length - 1];

      if (!localAddress.includes(`:${port}`)) {
        continue;
      }

      if (/^\d+$/.test(pid)) {
        pids.add(pid);
      }
    }

    return Array.from(pids);
  } catch {
    return [];
  }
}

function killPid(pid) {
  try {
    execSync(`taskkill /PID ${pid} /F /T`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function stopDevProcesses() {
  const allPids = new Set();

  for (const port of TARGET_PORTS) {
    const pids = getPidsByPort(port);
    pids.forEach((pid) => allPids.add(pid));
  }

  if (allPids.size === 0) {
    console.log("No active dev processes found on target ports.");
    return;
  }

  let killed = 0;

  for (const pid of allPids) {
    if (killPid(pid)) {
      killed += 1;
      console.log(`Stopped process PID ${pid}`);
    }
  }

  if (killed === 0) {
    console.log("No processes could be stopped.");
    process.exitCode = 1;
    return;
  }

  console.log(`Stopped ${killed} process(es).`);
}

stopDevProcesses();
