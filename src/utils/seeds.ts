import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import Thought from "../models/Thought";
import connectDB from "../config/connection"; // Ensure the connection is imported

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

    // Seed thoughts
    const thoughts = await Thought.insertMany([
      {
        thoughtText: "This is the first thought!",
        username: users[0].username,
      },
      {
        thoughtText: "Here's another thought!",
        username: users[1].username,
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
