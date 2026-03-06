import { Container, getContainer } from "@cloudflare/containers";
import { env } from "cloudflare:workers";

export class GlanceContainer extends Container {
  defaultPort = 8080;
  sleepAfter = "10m";
  enableInternet = true;
  envVars = {
    GITHUB_TOKEN: env.GITHUB_TOKEN as string,
  };
}

interface Env {
  GLANCE: DurableObjectNamespace<GlanceContainer>;
  GITHUB_TOKEN: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return getContainer(env.GLANCE).fetch(request);
  },
};
