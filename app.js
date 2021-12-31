const express = require("express");
const cors = require("cors");
const router = require("./routes/index");

const app = express();

app.use(cors("tiny"));
app.use(express.json());
app.use("/api", router);

module.exports = app;