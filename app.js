const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const routes = require("./src/routes/index.js");

const env = dotenv.config().parsed;

const PORT = env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api", routes);

app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}!`));
