require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const config = require("./config/environement");
const database = require("./config/database");
const movie = require("./routes/api/movies");

const { port, allowedDomains } = config;
const { connect } = database;

const app = express();

app.use(cors({ origin: allowedDomains, credentials: true }));

app.use(compression());

app.use(helmet());

if (process.env.NODE_ENV !== "test") {
  connect();
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));
app.use("/api/movies", movie);

const server = http.createServer(app);

server.listen(port, () => {
  console.info(`✅ Server started on port ${port}`);
});
