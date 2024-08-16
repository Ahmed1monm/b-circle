import {createLogger, format, transports} from "winston";

const {combine, timestamp, label, printf} = format;


export const logger = createLogger({
    transports: [
        new transports.File({filename: "error.log", level: "error"}),
        new transports.File({filename: "combined.log"}),
    ],
});

logger.add(
    new transports.Console({
        format: combine(
            label({label: "b-circle"}),
            timestamp(),
            printf(({level, message, label, timestamp}) => {
                return `${timestamp} [${label}] ${level}: ${message}`;
            })
        )
    })
);