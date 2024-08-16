import express from 'express';
import morgan from "morgan";
import bodyParser from "body-parser";

import config from "./config";
import {logger} from "./clients";
import {errorHandler} from "./middlewares";
import router from "./routes";

const app = express();

app.use(morgan("common"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(errorHandler);

app.use("/api", router);

app.listen(config.port, () => {
    logger.info(`Server is running on port ${config.port}`);
});

process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception: ", err);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    logger.error("Unhandled Rejection: ", err);
    process.exit(1);
});

process.on("SIGINT", () => {
    logger.info("SIGINT received. Shutting down server.");
    process.exit(0);
});