const app = require("./app");
const {connection} = require("./db/mongo");
// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
const {swaggerConfig} = require("./config/swagger-confij");
require("dotenv").config();

const port = process.env.PORT || 3000;

swaggerConfig();
// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Conduit API",
//             version: "1.0.0",
//             description: "A simple articles api",
//         },
//         servers: [
//             {
//                 url: "http://localhost:3000",
//             },
//         ],
//     },
//     apis: ["./routes/*.js"],
// };

// const specs = swaggerJsDoc(options);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


connection.then(() => {
    console.log("Se ha conectado correctamente");
    app.listen(port, () => {
        console.log(`Se escucha puerto ${port}`);
    });
}).catch((err) => {
    console.log(err);
});