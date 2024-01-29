const config = require("../environement");
const { MongoClient } = require("mongodb");
require("dotenv").config();

// const url = process.env.MONGODB_URL;
const { mongo_url } = config;
const options = {};

const defaultDbname = "sample_mflix";

const client = new MongoClient(mongo_url, options);

let db;

const connect = async (dbName = defaultDbname) => {
  const conn = await client.connect();
  db = conn.db(dbName);
  console.info(`✅💾 Database ${dbName} connected!`);
};

module.exports = { connect, client, db };
