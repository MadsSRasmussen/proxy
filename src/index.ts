/**
 * **Proxy** is a simple Deno proxy server.
 * From this module tools to create a proxy server can be imported.
 *
 * ### Example usage
 *
 * ```ts
 * import { startServer } from "@msrass/proxy";
 * startServer({
 *     target: "https://pokeapi.co/api/v2/",
 *     headers: {
 *         "Content-Type": "application/json",
 *     },
 *     changeHost: false,
 *     port: 3000,
 * });
 * ```
 *
 * @module
 */

import { startProxyServer } from "./server/server.ts";

if (import.meta.main) {
    startProxyServer();
}

export * from "./types.ts";
export { proxyHandler } from "./server/proxy-handler.ts";
export { startProxyServer } from "./server/server.ts";
