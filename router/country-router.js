const express = require("express");
const router = express.Router();
const Country = require("../model/country-model");
const fetch = require("node-fetch");
require("dotenv").config();

router.post("/api/countries", async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the country already exists
    const existingCountry = await Country.findOne({ name });

    if (existingCountry) {
      // Country already exists, return a message or handle as needed
      return res.status(400).json({ error: "Country already exists" });
    }

    // Country doesn't exist, create a new entry
    const newCountry = await Country.create({ name });
    res.json(newCountry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/countries/getall", async (req, res) => {
  try {
    // Fetch all countries from the database
    const countries = await Country.find();

    if (countries.length > 0) {
      // Send the list of countries if there are any
      res.json(countries);
    } else {
      // Send a message if there are no countries
      res.json({ message: "No countries found in the database." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/countries/:country", async (req, res) => {
  const { country } = req.params;

  try {
    const apiKey = process.env.APIKEY;
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${apiKey}`
    );
    const weatherData = await weatherResponse.json();
    const combinedData = { country, weather: weatherData };

    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});



module.exports = router;