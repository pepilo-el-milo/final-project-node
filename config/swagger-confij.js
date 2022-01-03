const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = require("../app");

const swaggerConfig = () => {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Conduit API",
                version: "1.0.0",
                description: "A simple articles api",
            },
            servers: [
                {
                    url: "http://localhost:3000",
                },
            ],
        },
        apis: ["./routes/*.js"],
    };
    
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
};

module.exports = {
    swaggerConfig
};