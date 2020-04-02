const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("./db/db");

const app = express();
const port = 3000;

if (app.use(db)) {
  console.log("Database terkoneksi");
} else {
  console.log("Database tidak terkoneksi");
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use("/", require("./route/routes"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
