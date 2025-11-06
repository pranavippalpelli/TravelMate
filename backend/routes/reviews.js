const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Review = require("../models/review");
const Listing = require("../models/listing");

// Create review (auth required)
router.post("/:postId", auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const post = await Listing.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const review = new Review({
      post: post._id,
      author: req.user.id,
      rating,
      comment,
    });

    await review.save();
    await review.populate("author", "name email");
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reviews for a post
router.get("/:postId", async (req, res) => {
  try {
    const reviews = await Review.find({ post: req.params.postId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });     
      // The .sort({ createdAt: -1 }) function sorts the reviews in descending order of creation time, showing the newest reviews first.
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete review (only owner)
router.delete("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });
    if (review.author.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
