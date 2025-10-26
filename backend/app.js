
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

// ---------------------
// Middleware
// ---------------------
app.use(express.json());
app.use(cookieParser());


const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://travel-mate-ivory.vercel.app", // your deployed frontend
  "http://localhost:3000",            // local dev
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
// ---------------------
// MongoDB Connection
// ---------------------
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ---------------------
// Routes
// ---------------------
app.use("/api/listings", listingsRouter);
app.use("/api/auth", authRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/bookings", bookingsRouter);

// Root route (for testing)
app.get("/", (req, res) => res.json({ message: "🌍 TravelMate API running..." }));

// ---------------------
// Start server
// ---------------------
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
