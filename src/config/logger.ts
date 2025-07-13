// import winston from "winston";
// import { Config } from ".";

// const logger = winston.createLogger({
//     level: "info",
//     defaultMeta: {
//         serviceName: "auth-service",
//     },
//     format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.json(),
//     ),
//     transports: [
//         new winston.transports.File({
//             dirname: "logs",
//             filename: "combined.log",
//             level: "info",
//             silent: Config.NODE_ENV === "test",
//         }),
//         new winston.transports.File({
//             dirname: "logs",
//             filename: "error.log",
//             level: "error",
//             silent: Config.NODE_ENV === "test",
//         }),
//         new winston.transports.Console({
//             level: "info",
//             silent: Config.NODE_ENV === "test",
//         }),
//     ],
// });

// export default logger;

import { createLogger, transports, format } from "winston";
import { Config } from "./index";

const { combine, timestamp, printf, errors, colorize } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `{ Timestamp: ${timestamp} ${level}: ${stack || message} }`;
});

const logger = createLogger({
    level: "info",
    // defaultMeta: {
    //   serviceName: "KT-Guru-server",
    // },
    format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }), // Capture stack trace for errors
        logFormat,
    ),
    transports: [
        new transports.Console({
            level: "info",
            silent: Config.NODE_ENV === "test",
        }),
    ],
});

export default logger;
