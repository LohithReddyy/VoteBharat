import express from "express";
import { adminLogin, getAllUsers,getAdminDashboard,getVotes,addUser,updateUser,deleteUser } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users",adminAuth, getAllUsers);
router.get("/dashboard", adminAuth, getAdminDashboard);
router.get("/votes",adminAuth,getVotes);

router.post("/adduser",adminAuth,addUser);
router.put("/updateuser/:id",adminAuth,updateUser);
router.delete("/deleteuser/:id",adminAuth,deleteUser);


export default router;
