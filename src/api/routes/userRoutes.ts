import express from "express";
import User from "../../models/User.js";

const router = express.Router();

// GET all users
router.get("/", async (_req, res) => {
  const users = await User.find().populate("thoughts").populate("friends");
  res.json(users);
});

// GET single user
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("thoughts").populate("friends");
  res.json(user);
});

// POST new user
router.post("/", async (req, res) => {
  const newUser = await User.create(req.body);
  res.json(newUser);
});

// PUT update user
router.put("/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

// DELETE user
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });

  // Add a friend
router.post("/:userId/friends/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    // Check if the friendId is already in the user's friends array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ error: "This user is already your friend." });
    }

    // Add the friend
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: friendId } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error adding friend:", err);
    res.status(500).json({ error: "An error occurred while adding the friend" });
  }
});

// Remove a friend
router.delete("/:userId/friends/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    // Remove the friend
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error removing friend:", err);
    res.status(500).json({ error: "An error occurred while removing the friend" });
  }
});

});

export default router;
