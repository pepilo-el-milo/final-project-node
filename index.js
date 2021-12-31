const app = require("./app");
const {connection} = require("./db/mongo");
require("dotenv").config();

const port = process.env.PORT || 3000;

connection.then(() => {
    console.log("Se ha conectado correctamente");
    app.listen(port, () => {
        console.log(`Se escucha puerto ${port}`);
    });
}).catch((err) => {
    console.log(err);
});