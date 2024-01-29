const express = require("express");
const router = express.Router();
const config = require("../../config/database");
const { client } = config;

router.get("/", async (req, res) => {
  try {
    const database = client.db("sample_mflix");
    const query = { year: { $gt: 2010 } };
    const movies = await database
      .collection("movies")
      .find(query)
      .limit(50)
      .toArray();
    console.info(`✅💾 Get all movies with success!`);
    res.json(movies);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
