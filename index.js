const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const bookRouter = require("./routes/bookRouter");

mongoose.connect("mongodb://localhost/bookDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB LUNCHED SUCCESSFULLY");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/book", bookRouter);

app.listen(8080, () => console.log("API RUNNING IN PORT 80808"));
