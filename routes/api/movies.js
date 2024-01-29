const express = require("express");
const router = express.Router();
const config = require("../../config/database");
const { client } = config;

router.get("/", async (req, res) => {
  try {
    const database = client.db("sample_mflix");
    // const movies = database.collection("movies");
    const query = { year: { $gt: 2010 } };
    const moviess = await database
      .collection("movies")
      .find(query)
      .limit(50)
      .toArray();
    console.info(`✅💾 Get all movies with success!`);
    // Query for a movie that has the title 'Back to the Future'
    // const query = { title: "Back to the Future" };
    // const movie = await movies.findOne(query);
    res.json(moviess);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
