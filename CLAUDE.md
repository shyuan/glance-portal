# Glance Portal

Glance dashboard deployed to Cloudflare Containers.

## Tech Stack
- **Glance** — self-hosted dashboard (Go binary, distroless image)
- **Cloudflare Containers** — hosting via Workers + Durable Objects
- **Package manager**: bun (not npm)

## Project Structure
```
glance/           # Glance config files
  glance.yml      # Main config (includes page-*.yml)
  page-*.yml      # Individual page configs
  theme-*.yml     # Theme files
src/              # Cloudflare Worker source
wrangler.jsonc    # Wrangler config
Dockerfile        # Container image definition
```

## Key Commands
- `bun install` — install dependencies
- `npx wrangler deploy --dry-run` — validate without deploying
- `npx wrangler deploy` — deploy to Cloudflare

## Glance Config Notes
- Pages use `!include:` directives for modularity
- Column layouts must have 1-2 `full` columns (see memory/glance-layout.md)
- Taiwan listed stocks use `.TW`, OTC stocks use `.TWO` for Yahoo Finance
