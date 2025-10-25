

// // backend/app.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// require("dotenv").config();

// const listingsRouter = require("./routes/listings");
// const authRouter = require("./routes/auth");
// const reviewsRouter = require("./routes/reviews");
// const bookingsRouter = require("./routes/bookings");

// const app = express();
// const PORT = process.env.PORT ;

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// // // MongoDB
// // mongoose.connect(process.env.MONGO_URL).then(() => console.log("✅ Connected to DB"));
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ Connected to MongoDB Atlas"))
// .catch(err => console.error("❌ MongoDB connection error:", err));

// // Routes
// app.use("/api/listings", listingsRouter);
// app.use("/api/auth", authRouter);
// app.use("/api/reviews", reviewsRouter);
// app.use("/api/bookings", bookingsRouter);

// app.get("/", (req, res) => res.json({ message: "API running..." }));

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const listingsRouter = require("./routes/listings");
const authRouter = require("./routes/auth");
const reviewsRouter = require("./routes/reviews");
const bookingsRouter = require("./routes/bookings");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allow multiple frontend URLs
const allowedOrigins = [
  "https://travel-mate-6n6w9g0nb-pranavs-projects-987c93eb.vercel.app", // current frontend
  "https://travel-mate-bhsf7yf52-pranavs-projects-987c93eb.vercel.app"  // old / staging frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server / curl
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "CORS policy: This origin is not allowed.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/listings", listingsRouter);
app.use("/api/auth", authRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/bookings", bookingsRouter);

app.get("/", (req, res) => res.json({ message: "API running..." }));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
