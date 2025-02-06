import express from "express";
import { adminLogin, getAllUsers,updateUser,getAdminDashboard } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users",adminAuth, getAllUsers);
router.get("/dashboard", adminAuth, getAdminDashboard);
router.post("/users/:id",adminAuth,updateUser);

export default router;
