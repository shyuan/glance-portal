import { Container } from "cloudflare:workers";

export class GlanceContainer extends Container {
  defaultPort = 8080;
  sleepAfter = "10m";
}

interface Env {
  GLANCE: DurableObjectNamespace<GlanceContainer>;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const id = env.GLANCE.idFromName("glance");
    const stub = env.GLANCE.get(id);
    return stub.fetch(request);
  },
};
