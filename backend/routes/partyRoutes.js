import express from "express";
import multer from "multer";
import { addParty, deleteParty, updateParty } from "../controllers/partyController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/add", adminAuth, upload.single("symbol"), addParty);
router.delete("/:id", adminAuth, deleteParty);
router.put("/:id", adminAuth, upload.single("symbol"), updateParty);

export default router;
