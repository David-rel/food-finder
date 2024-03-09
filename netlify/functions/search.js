const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(express.json());
app.use(express.static("public")); // Serve your static HTML form from here

app.post("/search-recipes", async (req, res) => {
  const { query } = req.body; // Assuming you're sending a search query
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch`;
  const params = {
    apiKey: process.env.SPOONACULAR_API_KEY,
    query,
    number: 10, // Limit results to 10 recipes for example
  };

  try {
    const response = await axios.get(apiUrl, { params });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching recipes");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

