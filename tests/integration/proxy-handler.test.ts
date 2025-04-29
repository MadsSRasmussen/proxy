import { assertEquals } from "jsr:@std/assert";
import { proxyHandler } from "../../src/server/proxy-handler.ts";
import type { ProxyHandlerSettings } from "../../src/types.ts";

Deno.test("proxyHandler forwards request and injects headers", async () => {
    const backend = Deno.serve({ port: 9000 }, (req) => {
        const authHeader = req.headers.get("authorization") || "none";
        return new Response(`Recieved authorization header: ${authHeader}`);
    });

    const request = new Request("http://api.example.com", {
        method: "GET",
    });

    const proxyConfig: ProxyHandlerSettings = {
        target: "http://localhost:9000",
        changeHost: true,
        headers: {
            "Authorization": "Bearer some-token",
        },
    };

    const response = await proxyHandler(request, proxyConfig);
    const text = await response.text();

    assertEquals(text, "Recieved authorization header: Bearer some-token");

    backend.shutdown();
});
