import express from "express";
import connectDB from "./config/connection";
import userRoutes from "./api/routes/userRoutes";
import thoughtRoutes from "./api/routes/thoughtRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
