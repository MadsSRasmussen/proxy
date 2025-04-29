import type { ProxyHandlerSettings } from "../types.ts";

/**
 * Handler to proxy a `Request` with specified settings.
 *
 * @param request The request to be proxied.
 * @param config The proxy handler settings.
 */
export async function proxyHandler(
    request: Request,
    config: ProxyHandlerSettings,
): Promise<Response> {
    const requestUrl = new URL(request.url);
    const url = new URL(requestUrl.pathname, config.target);

    const headers = new Headers(request.headers);
    for (const [key, value] of Object.entries(config.headers)) {
        headers.set(key, value);
    }

    if (config.changeHost) {
        headers.set("Host", config.target);
    }

    const targetRequest = new Request(url, {
        method: request.method,
        headers: headers,
        body: request.body,
    });

    const targetResponse = await fetch(targetRequest);

    return new Response(targetResponse.body, {
        status: targetResponse.status,
        headers: targetRequest.headers,
    });
}
