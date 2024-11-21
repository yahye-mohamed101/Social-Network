import { Router } from "express";
import userRoutes from "./userRoutes";
import thoughtRoutes from "./thoughtRoutes";

const router = Router();

// Mount the user routes at /api/users
router.use("/users", userRoutes);

// Mount the thought routes at /api/thoughts
router.use("/thoughts", thoughtRoutes);

export default router;
