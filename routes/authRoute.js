import express from "express";
import { registerController, loginController } from "../controllers/authController.js";

//CREATING ROUTER OBJECT
const router = express.Router();

//ROUTING
//REGIDTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post('/login', loginController);
export default router;