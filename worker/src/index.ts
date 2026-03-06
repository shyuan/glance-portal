import { Container, getContainer } from "@cloudflare/containers";

export class GlanceContainer extends Container {
  defaultPort = 8080;
  sleepAfter = "10m";
}

interface Env {
  GLANCE: DurableObjectNamespace<GlanceContainer>;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const container = getContainer(env.GLANCE);
    await container.start();
    return container.fetch(request);
  },
};
