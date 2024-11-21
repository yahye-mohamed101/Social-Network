import express from "express";
import Thought from "../../models/Thought";

const router = express.Router();

// GET all thoughts
router.get("/", async (_req, res) => {
  const thoughts = await Thought.find();
  res.json(thoughts);
});

// GET single thought
router.get("/:id", async (req, res) => {
  const thought = await Thought.findById(req.params.id);
  res.json(thought);
});

// POST new thought
router.post("/", async (req, res) => {
  const newThought = await Thought.create(req.body);
  res.json(newThought);
});

// PUT update thought
router.put("/:id", async (req, res) => {
  const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedThought);
});

// DELETE thought
router.delete("/:id", async (req, res) => {
  await Thought.findByIdAndDelete(req.params.id);
  res.json({ message: "Thought deleted" });
});

export default router;
