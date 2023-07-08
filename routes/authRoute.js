import express from "express";
import {
    registerController,
    loginController,
    testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//CREATING ROUTER OBJECT
const router = express.Router();

//ROUTING
//REGIDTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post('/login', loginController);

//TEST ROUTES
router.get("/test", requireSignIn, isAdmin, testController);      //CAN CREATE ANY NUMBER OF MIDDLE WARE BETWEEN TEST AND CONTROLLER

export default router;