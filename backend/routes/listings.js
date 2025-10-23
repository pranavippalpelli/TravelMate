
const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const Review = require("../models/review");
const auth = require("../middleware/auth");

// GET all listings
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) query = { $or: [{ title: { $regex: search, $options: "i" } }, { location: { $regex: search, $options: "i" } }] };

    const all = await Listing.find(query).populate("owner", "name email");
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single listing with reviews
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("owner", "name email");
    if (!listing) return res.status(404).json({ error: "Not found" });

    const reviews = await Review.find({ post: listing._id }).populate("author", "name email");
    res.json({ ...listing.toObject(), reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE listing
router.post("/", auth, async (req, res) => {
  const payload = { ...req.body, owner: req.user.id };
  const newListing = new Listing(payload);
  await newListing.save();
  await newListing.populate("owner", "name email");
  res.status(201).json(newListing);
});

// UPDATE listing
router.put("/:id", auth, async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ error: "Not found" });
  if (listing.owner.toString() !== req.user.id) return res.status(403).json({ error: "Not authorized" });

  Object.assign(listing, req.body);
  await listing.save();
  await listing.populate("owner", "name email");
  res.json(listing);
});

// DELETE listing
router.delete("/:id", auth, async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).json({ error: "Not found" });
  if (listing.owner.toString() !== req.user.id) return res.status(403).json({ error: "Not authorized" });

  await listing.deleteOne();
  res.json({ message: "Deleted" });
});

module.exports = router;
