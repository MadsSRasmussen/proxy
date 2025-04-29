# Simple Deno proxy server

This allows you to spin up a proxy server with Deno directly from the command
line.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Installation

You can either add the project as a dependency or execute it directly via deno
via `jsr`.

Running the proxy-server directly via Deno:

```bash
deno run --allow-net jsr:@msrass/proxy -t="https://google.com"
```

If you intend to use it as a depency in your project, it can be added directly
with:

```ts
import { startProxyServer } from "jsr:@msrass/proxy";
```

Or using the `Deno add` command:

```bash
deno add jsr:@msrass/proxy
```

## Usage

The package can either be executed directly or used as a dependency in a
project.

### Using the proxy directly from the terminal

- `--target` (`-t`) - **Required** argument, specifying the target of the proxy
  server.
- `--inject-header` (`-h`) - _Optional_ argument, collected and sent along with
  each request. `-h=authorization:password`.
- `--listen-port` (`p`) - _Optional_ argument (_default: `8080`_), setting the
  port the proxy server listens on.
- `--change-host` (`c`) - _Optional_ argument, specifying wether the `Host`
  header should be set to the target header or not.

### Using the proxy as a dependency in a project

Alternatively, a server can be setup by importing the `startProxyServer`
function from the package root:

```ts
import { startProxyServer } from "@msrass/proxy";

startProxyServer({
    target: "https://pokeapi.co/api/v2/",
    headers: {
        "Content-Type": "application/json",
    },
    changeHost: false,
    port: 3000,
});
```

## Contributing

The package uses the `Deno.test` test-runner. The following command is used for
testing:

```bash
deno task test
```
