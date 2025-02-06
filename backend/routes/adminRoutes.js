import express from "express";
import { adminLogin, getAllUsers,getAdminDashboard,getVotes } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users",adminAuth, getAllUsers);
router.get("/dashboard", adminAuth, getAdminDashboard);
router.get("/votes",adminAuth,getVotes);


export default router;
