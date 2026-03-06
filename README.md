# glance-portal

A self-hosted [Glance](https://github.com/glanceapp/glance) dashboard deployed to Cloudflare Containers via GitHub Actions.

## Architecture

```
glance/glance.yml (edit config)
        |
        v
   git push to main
        |
        v
   GitHub Actions (deploy.yml)
        |
        v
   wrangler deploy
        |
        v
   Cloudflare Registry (build & push Docker image)
        |
        v
   Cloudflare Container (runs Glance)
        ^
        |
   Cloudflare Worker (proxies requests to container)
```

The Cloudflare Worker acts as the routing layer. When a request arrives, it forwards it to the Glance container. The container automatically sleeps after 10 minutes of inactivity and wakes on the next request.

## Setup

### 1. GitHub Secrets

Add these two secrets in your repository settings (**Settings > Secrets and variables > Actions**):

| Secret | Description |
|---|---|
| `CLOUDFLARE_API_TOKEN` | API token with **Edit Cloudflare Workers** permission. Create one at [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens). |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID. Found on the **Workers & Pages** overview page in the right sidebar. |

### 2. Requirements

- Cloudflare **Workers Paid** plan (required for Containers, currently in public beta)
- The base image `ghcr.io/shyuan/glance-base:latest` must be accessible

## Usage

### Day-to-day workflow

1. Edit `glance/glance.yml` to customize your dashboard
2. Commit and push to `main`
3. GitHub Actions automatically deploys the update

You can also trigger a deploy manually from the **Actions** tab using the "Run workflow" button.

### Updating the base image

Change the `FROM` tag in `Dockerfile`:

```dockerfile
FROM ghcr.io/shyuan/glance-base:v0.7.4
```

Then commit and push. The workflow will build a new container image with the updated base.

## Cold start

When the container has been sleeping, the first request takes approximately **2-3 seconds** to respond. This is expected behavior for Cloudflare Containers — subsequent requests are fast while the container remains active.
