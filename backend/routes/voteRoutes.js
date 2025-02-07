import express from "express";
import { getAllParties, voteForParty } from "../controllers/voteController.js";

const router = express.Router();

router.get("/parties", getAllParties); // Fetch all parties
router.post("/vote", voteForParty); // Vote for a party


export default router;
