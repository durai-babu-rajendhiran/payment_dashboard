const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();
const { swaggerUi, specs } = require('./src/swagger');

//app
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

readdirSync("./src/v1/routes").map((r) =>app.use("/api/", require("./src/v1/routes/" + r)));

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
