const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
require("dotenv").config({ path: "../.env" });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("✅ Connected to MongoDB Atlas");

  // Initialize DB
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("✅ Data was initialized");
  } catch (err) {
    console.error("❌ Error initializing data:", err);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
})
.catch(err => console.error("❌ MongoDB connection error:", err));
