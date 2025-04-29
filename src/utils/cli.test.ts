import { parseProxyConfig } from "./cli.ts";
import { assertEquals, assertInstanceOf, assertThrows } from "jsr:@std/assert";

Deno.test("parseProxyConfig throws error on mising --target argument", () => {
    const err = assertThrows(() => {
        parseProxyConfig([]);
    });

    assertInstanceOf(err, Error);
    assertEquals(err.message, "Missing required --target argument.");
});

Deno.test("parseProxyConfig parses single valid hader", () => {
    const args = [
        "--target",
        "http://api.example.com",
        "--inject-header",
        "Content-Type:application/json",
    ];
    const config = parseProxyConfig(args);

    assertEquals(config.target, "http://api.example.com");
    assertEquals(config.port, 8080);
    assertEquals(config.changeHost, false);

    assertEquals(config.headers, {
        "Content-Type": "application/json",
    });
});

Deno.test("parseProxyConfig parses multiple headers", () => {
    const args = [
        "--target",
        "http://api.example.com",
        "--inject-header",
        "Content-Type:application/json",
        "--inject-header",
        "Accept:application/xml",
    ];
    const config = parseProxyConfig(args);

    assertEquals(config.target, "http://api.example.com");
    assertEquals(config.port, 8080);
    assertEquals(config.changeHost, false);

    assertEquals(config.headers, {
        "Content-Type": "application/json",
        "Accept": "application/xml",
    });
});

Deno.test("parseProxyConfig throws on invalid header format", () => {
    const args = [
        "--target",
        "http://api.example.com",
        "--inject-header",
        "InvalidHeader",
    ];

    const err = assertThrows(() => {
        parseProxyConfig(args);
    });

    assertInstanceOf(err, Error);

    assertEquals(
        err.message,
        "Invalid header format: InvalidHeader. Expected format is key:header.",
    );
});

Deno.test("parseProxyConfig parses change-host flag", () => {
    const args = [
        "--target",
        "http://api.example.com",
        "--change-host",
    ];

    const config = parseProxyConfig(args);

    assertEquals(config.target, "http://api.example.com");
    assertEquals(config.port, 8080);

    assertEquals(config.changeHost, true);
});

Deno.test("parseProxyConfig parses aliases", () => {
    const args = [
        "-t",
        "http://api.example.com",
        "-h",
        "Content-Type:application/json",
        "-p",
        "3000",
        "-c",
    ];

    const config = parseProxyConfig(args);

    assertEquals(config.target, "http://api.example.com");
    assertEquals(config.port, 3000);
    assertEquals(config.changeHost, true);
    assertEquals(config.headers, {
        "Content-Type": "application/json",
    });
});
