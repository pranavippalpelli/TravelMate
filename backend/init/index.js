const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


//connecting mongodb with nodejs: 
const MONGO_URL = "mongodb://127.0.0.1:27017/TravelMate";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
 

//inserting data which is data.js file in database.
//while we are dealing with db . we should use async and await func or .then(),.catch() function.
const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
