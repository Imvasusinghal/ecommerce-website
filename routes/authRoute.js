import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { updateProfileController } from './../controllers/authController.js';

//CREATING ROUTER OBJECT
const router = express.Router();

//ROUTING
//REGIDTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post('/login', loginController);

//FORGOT PASSWORD || POST
router.post('/forgot-password', forgotPasswordController)

//TEST ROUTES
router.get("/test", requireSignIn, isAdmin, testController);      //CAN CREATE ANY NUMBER OF MIDDLE WARE BETWEEN TEST AND CONTROLLER

//PROTECTED USER ROUTE AUTH
router.get('/user-auth', requireSignIn, (req,res) => {
    res.status(200).send({ ok: true});
});

//PROTECTED ADMIN ROUTE AUTH
router.get('/admin-auth', requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ ok: true});
});

//UPDATE PROFILE
router.put("/profile", requireSignIn, updateProfileController);

export default router;