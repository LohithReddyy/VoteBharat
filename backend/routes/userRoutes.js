import express from 'express';
import { signup, signin,getUserDetails } from '../controllers/userController.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post("/user", getUserDetails);


export default router;
