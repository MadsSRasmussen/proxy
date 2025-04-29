import { parseProxyConfig } from "../utils/cli.ts";
import { proxyHandler } from "./proxy-handler.ts";
import type { ProxyConfig } from "../types.ts";

/**
 * Function to server a proxy server with specified settings.
 *
 * @param [config=Deno.args] The configuration of the proxy server - this can either be an array of string-arguments or a ProxyConfig object.
 */
export function startProxyServer(
    config: string[] | ProxyConfig = Deno.args,
): Deno.HttpServer<Deno.NetAddr> {
    const parsedConfig = Array.isArray(config)
        ? parseProxyConfig(config)
        : config;

    const server = Deno.serve({
        port: parsedConfig.port,
        onListen: () => {
            console.log(`Proxy is listening on port: ${parsedConfig.port}`);
        },
    }, (request) => proxyHandler(request, parsedConfig));

    return server;
}
