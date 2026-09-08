# Guide verification evidence

Target guide: [Request and review leave](https://empay-api-docs.thally.app/guides/request-and-review-leave)

Verified against the published site on September 5, 2026.

| Required surface | URL or request | Result | Screenshot |
| --- | --- | --- | --- |
| HTML | [`/guides/request-and-review-leave`](https://empay-api-docs.thally.app/guides/request-and-review-leave) | `200`, `text/html` | [HTML](HTML.png) |
| Markdown | [`/guides/request-and-review-leave.md`](https://empay-api-docs.thally.app/guides/request-and-review-leave.md) | `200`, `text/markdown` | [Markdown](Markdown.png) |
| JSON | [`?format=json`](https://empay-api-docs.thally.app/api/docs/guides/request-and-review-leave?format=json) | `200`, `application/json`, guide id present | [JSON](JSON.png) |
| JSON-LD | [`?format=ldjson`](https://empay-api-docs.thally.app/api/docs/guides/request-and-review-leave?format=ldjson) | `200`, `application/ld+json`, `TechArticle` graph present | [JSON-LD](JSONLD.png) |
| Search | [`/api/search?q=request%20leave`](https://empay-api-docs.thally.app/api/search?q=request%20leave) | `200`, guide appears in results | [Search](Search.png) |
| Agent index | [`/api/docs-index`](https://empay-api-docs.thally.app/api/docs-index) | `200`, `guides/request-and-review-leave` present | [Agent index](docsIndex.png) |
| MCP | [`/api/mcp`](https://empay-api-docs.thally.app/api/mcp) | MCP endpoint; send JSON-RPC `initialize` via `POST` and receive `200`, server `empay-docs`, protocol `2025-03-26` | [MCP](MCP%20server.png) |

MCP discovery card: [`/.well-known/mcp.json`](https://empay-api-docs.thally.app/.well-known/mcp.json)

The same guide is therefore available to a human reader and to machine clients
through every surface required by Track 2.
