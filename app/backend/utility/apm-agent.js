import apm from "elastic-apm-node";
import { config } from "dotenv";
config();


apm.start({
  serviceName: process.env.BACKEND_SERVICE_NAME,
  serverUrl: process.env.APM_URL,
  environment: "production",
});
