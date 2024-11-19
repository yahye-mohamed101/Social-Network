import express from "express";
import User from "../../models/User.ts";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
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
});

export default router;
