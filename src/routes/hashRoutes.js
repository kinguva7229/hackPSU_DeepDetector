import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// register user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User exists" });
    const user = await User.create({ username, email, password });
    res.json({ status: "success", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// add new hash
router.post("/:userId/addHash", async (req, res) => {
  const { userId } = req.params;
  const { hash } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    user.photoHashes.push(hash);
    await user.save();
    res.json({ status: "success", message: "Hash stored" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all hashes
router.get("/:userId/hashes", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ status: "success", hashes: user.photoHashes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
