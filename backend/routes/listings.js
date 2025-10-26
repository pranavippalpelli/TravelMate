
const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const auth = require("../middleware/auth.js");

// GET all listings
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = { 
        $or: [
          { title: { $regex: search, $options: "i" } }, 
          { location: { $regex: search, $options: "i" } }
        ] 
      };
    }

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
    // listing.toObject() is used to convert the Mongoose document into a plain JavaScript object so we can add reviews and send it as clean JSON.
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE listing
router.post("/", auth, async (req, res) => {
  try {
    const payload = { ...req.body, owner: req.user.id };
    const newListing = new Listing(payload);
    await newListing.save();
    await newListing.populate("owner", "name email");
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE listing
router.put("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Not found" });
    if (listing.owner.toString() !== req.user.id) return res.status(403).json({ error: "Not authorized" });

    Object.assign(listing, req.body);
    await listing.save();
    await listing.populate("owner", "name email");
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE listing
router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Not found" });
    if (listing.owner.toString() !== req.user.id) return res.status(403).json({ error: "Not authorized" });

    await listing.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
