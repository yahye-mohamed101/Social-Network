import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Thought from "../models/Thought.js";
import connectDB from "../config/connection.js"; // Ensure the connection is imported

dotenv.config();

const seedData = async () => {
  try {
    // Connect to the database
    await connectDB(); // Establish the MongoDB connection
    console.log("Database connected for seeding");

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log("Database cleared!");

    // Seed users
    const users = await User.insertMany([
      {
        username: "number1",
        email: "number1@example.com",
      },
      {
        username: "number2",
        email: "number2@example.com",
      },
    ]);
    console.log("Users seeded!");

    if (users[0] && users[1]) {
      users[0].friends.push(users[1]._id as mongoose.Types.ObjectId); // Ensure _id is properly typed
      await users[0].save(); // Save the updated user document
      console.log("Friend added to the first user!");
    } else {
      console.error("Users are undefined; cannot add friends.");
    }

    // Seed thoughts
    const thoughts = await Thought.insertMany([
      {
        thoughtText: "This is the first thought!",
        username: users[0]?.username || "unknown",
      },
      {
        thoughtText: "Here's another thought!",
        username: users[1]?.username || "unknown",
      },
    ]);
    console.log("Thoughts seeded!", thoughts);

    // Close the connection
    mongoose.connection.close();
    console.log("Seeding complete!");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    // Ensure the connection is closed even if an error occurs
    mongoose.connection.close();
  }
};

// Run the seeding function
seedData();
