import express from "express";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//ROUTES
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),             //USED SO THAT WE CAN UPLOAD ANY TYPE OF FILE
  createProductController
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//GET PRODUCTS
router.get("/get-product", getProductController);

//SINGLE PRODUCT
router.get("/get-product/:slug", getSingleProductController);

//GET PHOTO
router.get("/product-photo/:pid", productPhotoController);

//DELETE PRODUCT
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//PRODUCT COUNT
router.get("/product-count", productCountController);

//PRODUCT PER PAGE
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;