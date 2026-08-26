# EmPay HRMS API documentation

Agent-ready developer documentation for the simulated EmPay HRMS REST API,
migrated from Mintlify to the open-source Thally runtime. The site combines
task-oriented guides, a 49-operation OpenAPI reference, troubleshooting, and
human and machine-readable documentation surfaces.

This is the canonical complete template consumed by Thally Cloud, the CLI, and
the MCP server. Runtime code is authored once in
[`thallylabs/thally`](https://github.com/thallylabs/thally), then generated into
this repository as a pinned, byte-identical snapshot. Do not manually repeat a
runtime fix in both repositories.

This README covers the portable starter, not the full managed platform. The
sole production architecture authority is
[`thally-cloud/ARCHITECTURE.md`](https://github.com/thallylabs/thally-cloud/blob/main/ARCHITECTURE.md),
available to maintainers with access to the private repository. The CLI, MCP,
and Cloud creation flows consume an exact promoted scaffold release rather
than treating the mutable `main` branch as a release identity.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3040](http://localhost:3040). The next available port is
used automatically when 3040 is occupied.

## Project content

- Pages live in `src/content/`.
- Navigation and Markdown distribution are configured in `docs.json`.
- Product identity and versioned brand defaults live in `src/data/site.ts`.
- The API contract lives in `public/openapi.yaml`.
- Architecture images and other public assets live in `public/`.

`starter-release.json` records the immutable starter and runtime version used
to create the site. Keep it in the repository so `thally starter update` can
plan framework updates without overwriting your content or portable settings.

`thally starter update` performs a three-way comparison between the recorded
previous scaffold, the promoted target scaffold, and your current project. It
updates unchanged framework-owned files, preserves user-owned files, and stops
for manual review when those contracts overlap. The command is a dry run until
you pass `--apply`.

Maintainers update the generated runtime snapshot through the **Sync Thally
runtime** workflow. CI rejects a changed pin without matching files, changed
files without a matching pin, missing files, and stale runtime files.

Content icons are neutral by default. Set `appearance.contentIcons` to `accent`
in `docs.json`, or add `iconColor="accent"` to an individual card or tile.
Public page URLs ending in `.md` are enabled in `docs.json` for the Track 2
multi-surface verification workflow.

## Validate changes

```bash
npm test
npm run build
npm ci --ignore-scripts --prefix .github/thally-tooling
.github/thally-tooling/node_modules/.bin/thally check --ci .
```

## Deploy

The site is a standard Next.js application. Deploy it through Thally Cloud or
any compatible Next.js host. Cloudflare Workers configuration is included in
`open-next.config.ts` and `wrangler.jsonc`.

Thally Cloud publishes an immutable managed site release and activates it by
moving the site's production pointer only after validation. Direct hosts use
their own release and rollback mechanisms; publishing a package or synchronizing
this starter does not move an existing site's pointer.

Copy `.env.example` to `.env.local` only when you need optional services. Never
commit real credentials.

## License

[MIT](LICENSE)
