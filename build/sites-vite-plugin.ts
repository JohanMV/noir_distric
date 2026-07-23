import { access, copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Plugin } from "vite";

const workerSource = `const worker = {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const url = new URL(request.url);
    url.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(url, request));
  },
};

export default worker;
`;

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/** Packages the Vite SPA as a Cloudflare-compatible Sites artifact. */
export function sites(): Plugin {
  let root = process.cwd();

  return {
    name: "sites",
    apply: "build",
    configResolved(config) {
      root = config.root;
    },
    async closeBundle() {
      const metadataDirectory = resolve(root, "dist", ".openai");
      const serverDirectory = resolve(root, "dist", "server");
      const hostingConfig = resolve(root, ".openai", "hosting.json");

      await rm(metadataDirectory, { recursive: true, force: true });
      await mkdir(metadataDirectory, { recursive: true });
      await mkdir(serverDirectory, { recursive: true });
      await writeFile(resolve(serverDirectory, "index.js"), workerSource, "utf8");

      if (await exists(hostingConfig)) {
        await copyFile(hostingConfig, resolve(metadataDirectory, "hosting.json"));
      }
    },
  };
}
