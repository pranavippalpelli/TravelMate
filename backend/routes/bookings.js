
const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Listing = require("../models/listing");
const auth = require("../middleware/auth");

// Create booking
router.post("/", auth, async (req, res) => {
  try {
    const { listing, startDate, endDate, guests } = req.body;
    if (!listing || !startDate || !endDate)
      return res.status(400).json({ error: "All fields required" });

    const foundListing = await Listing.findById(listing);
    if (!foundListing) return res.status(404).json({ error: "Listing not found" });

    let booking = new Booking({
      listing,
      user: req.user.id,
      startDate,
      endDate,
      guests: guests || 1,
    });

    // Save booking
    booking = await booking.save();

    // Populate after saving
    booking = await Booking.findById(booking._id)
      .populate("listing")
      .populate("user", "name email");

    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: err.message, details: err.errors });
  }
});

// Get bookings of logged-in user
router.get("/my", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("listing")
      .populate("user", "name email");

    res.json(bookings);
  } catch (err) {
    console.error("My bookings error:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Get bookings for owner (hotels they own)
router.get("/owner", auth, async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.user.id });
    const listingIds = listings.map(l => l._id);

    const bookings = await Booking.find({ listing: { $in: listingIds } })
      .populate("listing")
      .populate("user", "name email");

    res.json(bookings);
  } catch (err) {
    console.error("Owner bookings error:", err);
    res.status(500).json({ error: "Failed to fetch owner bookings" });
  }
});

// Delete booking
router.delete("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    if (booking.user.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    await booking.deleteOne();
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Delete booking error:", err);
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

module.exports = router;
