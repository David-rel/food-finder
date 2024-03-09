// netlify/functions/search.js
const axios = require("axios");
require("dotenv").config();

const SPOONACULAR_API_KEY = "9f3de1c88f4d4d638b466e374528e84d";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { query } = JSON.parse(event.body);
  const API_KEY = SPOONACULAR_API_KEY;
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}`;

  try {
    const response = await axios.get(apiUrl);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Search function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Failed to fetch recipes" }),
    };
  }
};
