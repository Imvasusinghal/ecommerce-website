import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
    categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

//ROUTES
// CREATE CATEGORY
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//UPDATE CATEGORY
router.put(
  "/update-category/:id",           //:id IS USED TO UPDATE THAT CATEGORY WHICH IS IN THE id
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//GET ALL CATEGORY
router.get("/get-category", categoryControlller);

//SINGLE CATEGORY
router.get("/single-category/:slug", singleCategoryController); //HERE TAKEN slug NOT id BECAUSE IN URL WE SHOW SLUG

//DELETE CATEGORY
router.delete(
  "/delete-category/:id",
  requireSignIn,                    //THIS SHOWS THAT USER SHOULD BE SIGN IN AND ADMIN THEN ONLY IT CAN DELETE CATEGORY
  isAdmin,
  deleteCategoryCOntroller
);

export default router;