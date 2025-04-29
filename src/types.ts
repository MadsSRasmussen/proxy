export type ProxyHandlerSettings = {
    target: string;
    headers: Record<string, string>;
    changeHost: boolean;
};

export type ProxyConfig = ProxyHandlerSettings & {
    port: number;
};
