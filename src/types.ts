/**
 * Configuration settings for the proxy handler.
 */
export type ProxyHandlerSettings = {
    target: string;
    headers: Record<string, string>;
    changeHost: boolean;
};

/**
 * Configuration settings for the proxy server.
 */
export type ProxyConfig = ProxyHandlerSettings & {
    port: number;
};
