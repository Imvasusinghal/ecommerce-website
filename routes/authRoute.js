import express from "express";
import { registerController } from "../controllers/authController.js";

//CREATING ROUTER OBJECT
const router = express.Router();

//ROUTING
//REGIDTER || METHOD POST
router.post("/register", registerController);

export default router;