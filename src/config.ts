import * as path from "path";
import dotenv from "dotenv";
import {logger} from "./clients";

dotenv.config();
const root_dir = path.join(__dirname, "..");
// logger.info("Node env: ", process.env.NODE_ENV)
// if (!process.env.NODE_ENV || process.env.NODE_ENV === "production") {
//     logger.info("--------------- production --------------------")
//     dotenv.config({debug: true, path: `.env`});
// } else {
//     logger.info("--------------- development --------------------")
//     logger.debug("root_dir: ", root_dir)
//     dotenv.config({debug: true, path: `../env.${process.env.NODE_ENV}`});
// }
//
// // dotenv.config({debug: true, path: `../env.${process.env.NODE_ENV}`});


const config = {
    root_dir,
    port: process.env.PORT || 3000,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PORT: process.env.DATABASE_PORT,
    MIGRATIONS_DIR: path.join(root_dir, "/db/migrations"),
    JWT_SECRET: process.env.JWT_SECRET,
};

export default config;