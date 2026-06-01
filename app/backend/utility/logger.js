import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(), // AWS CloudWatch reads JSON perfectly
  ),
  defaultMeta: { service: "portfolio-backend" },
  transports: [
    new winston.transports.Console(), // AWS captures stdout/stderr directly
  ],
});

export default logger;
