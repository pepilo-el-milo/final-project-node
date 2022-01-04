const winston = require("winston");

const winsLogs = winston.createLogger(
    {
        level: "info",
        transports: [
            new winston.transports.File({filename: "./logs/info.log", level: "info"}),
            new winston.transports.File({filename: "./logs/warn.log", level: "warn"}),
            new winston.transports.File({filename: "./logs/error.log", level: "error"}),
        ]
    }
);

const info = message => winsLogs.info(message);
const warn = message => winsLogs.warn(message);
const error = message => winsLogs.error(message);


module.exports = {
    info,
    warn,
    error
};