import winston from "winston";
import { config } from "dotenv";
config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(), // AWS CloudWatch reads JSON perfectly
  ),
  defaultMeta: { service: process.env.BACKEND_SERVICE_NAME },
  transports: [
    new winston.transports.Console(), // AWS captures stdout/stderr directly
  ],
});

export default logger;
