import { parseArgs } from "@std/cli/parse-args";
import type { ProxyConfig } from "../types.ts";

export function parseProxyConfig(args: string[]): ProxyConfig {
    const parsedArgs = parseArgs(args, {
        string: ["target", "inject-header"],
        boolean: ["change-host"],
        collect: ["inject-header"],
        default: {
            "listen-port": 8080,
        },
        alias: {
            t: "target",
            h: "inject-header",
            p: "listen-port",
            c: "change-host",
        },
    });

    if (!parsedArgs.target) {
        throw new Error("Missing required --target argument.");
    }

    const injectHeaders: Record<string, string> = {};
    parsedArgs["inject-header"].forEach((header) => {
        const [key, value] = header.split(":");
        if (!key || !value) {
            throw new Error(
                `Invalid header format: ${header}. Expected format is key:header.`,
            );
        }
        injectHeaders[key.trim()] = value.trim();
    });

    const config: ProxyConfig = {
        port: Number(parsedArgs["listen-port"]),
        target: parsedArgs.target,
        headers: injectHeaders,
        changeHost: parsedArgs["change-host"] ? true : false,
    };

    return config;
}
