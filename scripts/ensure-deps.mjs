import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const rootDir = process.cwd();
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

function hasFile(relativePath) {
  return fs.existsSync(path.join(rootDir, relativePath));
}

function runInherited(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const hasNodeModules = hasFile("node_modules");
const hasSharp = hasFile(path.join("node_modules", "sharp", "package.json"));
const hasMarked = hasFile(path.join("node_modules", "marked", "package.json"));

if (hasNodeModules && hasSharp && hasMarked) {
  process.exit(0);
}

const installCommand = hasFile("package-lock.json") ? ["ci"] : ["install"];

console.log("Dependencias faltantes detectadas. Ejecutando npm para reparar el entorno...");
runInherited(npmCommand, installCommand);
