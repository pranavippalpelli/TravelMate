// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");
// require("dotenv").config({ path: "../.env" }); 


// //connecting mongodb with nodejs: 
// // const MONGO_URL = "mongodb://127.0.0.1:27017/TravelMate";

// // main()
// //   .then(() => {
// //     console.log("connected to DB");
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });

// // async function main() {
// //   await mongoose.connect(MONGO_URL);
// // }
 
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ Connected to MongoDB Atlas"))
// .catch(err => console.error("❌ MongoDB connection error:", err));

// //inserting data which is data.js file in database.
// //while we are dealing with db . we should use async and await func or .then(),.catch() function.
// const initDB = async () => {
//   await Listing.deleteMany({});
//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };

// initDB();



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
