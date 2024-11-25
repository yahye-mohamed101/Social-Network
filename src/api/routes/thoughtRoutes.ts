import express from "express";
import Thought from "../../models/Thought.js";

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

// Add a reaction to a thought
router.post("/:thoughtId/reactions", async (req, res): Promise<any> => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;

  if (!reactionBody || !username) {
    return res.status(400).json({ error: "reactionBody and username are required" });
  }

  try {
    // Find the thought by ID and update it with the new reaction
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    res.status(200).json(updatedThought);
  } catch (err) {
    console.error("Error adding reaction:", err);
    res.status(500).json({ error: "An error occurred while adding the reaction" });
  }
});

// Delete a reaction from a thought
router.delete("/:thoughtId/reactions/:reactionId", async (req, res): Promise<any> => {
  const { thoughtId, reactionId } = req.params;

  try {
    // Find the thought and remove the reaction
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } }, // Remove the reaction by its _id
      { new: true } // Return the updated thought
    );

    if (!updatedThought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    res.status(200).json(updatedThought);
  } catch (err) {
    console.error("Error deleting reaction:", err);
    res.status(500).json({ error: "An error occurred while deleting the reaction" });
  }
});


export default router;
