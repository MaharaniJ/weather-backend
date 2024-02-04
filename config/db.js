const mongoose = require("mongoose");
require("dotenv").config();

const connectwithDB = async (req, res) => {
  try {
    const DB = process.env.DB_URI;
    await mongoose.connect(DB);
    console.log("Database connection established");
  } catch (error) {
    console.log("Error connecting to the database: " + error.message);
  }
};
connectwithDB();
