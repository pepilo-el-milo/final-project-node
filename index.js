const app = require("./app");
const {connection} = require("./db/mongo");
const {swaggerConfig} = require("./config/swagger-confij");
const logger = require("./helpers/logger");
require("dotenv").config();

const port = process.env.PORT || 3000;

swaggerConfig();

connection.then(() => {
    logger.info("Se ha conectado a Mongo correctamente");
    app.listen(port, () => {
        logger.info(`Se escucha puerto ${port}`);
    });
}).catch((err) => {
    logger.error(err);
});