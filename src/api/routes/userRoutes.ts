import express, { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../../models/User.js";

const router = express.Router();

// GET all users
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await User.find().populate("thoughts").populate("friends");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

// GET single user
router.get("/:id", async (req: Request, res: Response): Promise<any> =>  {
  try {
    const user = await User.findById(req.params.id).populate("thoughts").populate("friends");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "An error occurred while fetching the user" });
  }
});

// POST new user
router.post("/", async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "An error occurred while creating the user" });
  }
});

// PUT update user
router.put("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "An error occurred while updating the user" });
  }
});

// DELETE user
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "An error occurred while deleting the user" });
  }
});

// Add a friend
router.post("/:userId/friends/:friendId", async (req: Request, res: Response): Promise<any> => {
  const { userId, friendId } = req.params;

  try {
    // Convert friendId to ObjectId
    const friendObjectId = new mongoose.Types.ObjectId(friendId);

    // Check if the friendId is already in the user's friends array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.friends.includes(friendObjectId)) {
      return res.status(400).json({ error: "This user is already your friend." });
    }

    // Add the friend
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: friendObjectId } },
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
router.delete("/:userId/friends/:friendId", async (req: Request, res: Response): Promise<any> => {
  const { userId, friendId } = req.params;

  try {
    // Convert friendId to ObjectId
    const friendObjectId = new mongoose.Types.ObjectId(friendId);

    // Remove the friend
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendObjectId } },
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

export default router;
