import express from "express";
import multer from "multer";
import { addParty, getParties, deleteParty } from "../controllers/partyController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/add", adminAuth, upload.single("symbol"), addParty);
router.get("/", getParties);
router.delete("/:id", adminAuth, deleteParty);

export default router;
