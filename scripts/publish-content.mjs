import { spawnSync } from "node:child_process";

const trackedPaths = [
  "src/content/blog",
  "src/generated/blog-manifest.ts",
  "public/blog-index.json",
  "public/og",
  "public/rss.xml",
  "public/sitemap.xml",
  "public/llms.txt",
  "public/llms-full.txt",
];

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: "pipe",
    encoding: "utf8",
    ...options,
  });

  if (result.status !== 0) {
    const stderr = result.stderr?.trim();
    const stdout = result.stdout?.trim();
    throw new Error(stderr || stdout || `Fallo al ejecutar ${command} ${args.join(" ")}`);
  }

  return (result.stdout ?? "").trim();
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

function getArg(flag) {
  const index = process.argv.indexOf(flag);

  if (index === -1) {
    return undefined;
  }

  return process.argv[index + 1];
}

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const branch = run("git", ["branch", "--show-current"]);

if (branch !== "main") {
  console.error(`La publicacion automatica esta configurada para main. Rama actual: ${branch}`);
  process.exit(1);
}

runInherited(npmCommand, ["run", "build"]);
run("git", ["add", "--", ...trackedPaths]);

const stagedFiles = run("git", ["diff", "--cached", "--name-only"]);

if (!stagedFiles) {
  console.log("No hay cambios de contenido para publicar.");
  process.exit(0);
}

const defaultMessage = `content: publish blog update ${new Date().toISOString().slice(0, 16).replace("T", " ")}`;
const commitMessage = getArg("--message") ?? defaultMessage;

runInherited("git", ["commit", "-m", commitMessage]);
runInherited("git", ["push", "origin", branch]);

console.log("Contenido publicado. GitHub Actions se encargara del deploy.");
