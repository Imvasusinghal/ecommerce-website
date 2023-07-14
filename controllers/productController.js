import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs';
import categoryModel from "../models/categoryModel.js"


export const createProductController = async(req, res) => {
    try{

        const {name, slug, description, price, category, quantity, shipping}= req.fields;
        const {photo}= req.files;

        //VALIDATION
        switch(true){
            case !name:
                return res.status(500).send({error: "Name is required"});
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000:
                return res
                .status(500)
                .send({ error: "Photo is required and should be less then 1mb" });
        }

        const products= new productModel({...req.fields, slug:slugify(name)});
        if(photo){
            products.photo.data= fs.readFileSync(photo.path);
            products.photo.contentType= photo.type;
        }

        await products.save();
        res.status(201).send({
            sccess:true,
            message:"Product created successfully",
            products,
        });


    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: "Error in creating product",

        })
    }
};

//GET ALL PRODUCTS
export const getProductController = async (req, res) => {
    try {
      const products = await productModel
        .find({})
        .populate("category")        //POPULATE SHOW ALL DATA OF CATEGORY
        .select("-photo")           //MEANS DON'T WANT TO GET THE PHOTO INITIALLY
        .limit(12)                  //LIMITING NO. OF PRODUCTS
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        counTotal: products.length,
        message: "ALL Products ",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting products",
        error: error.message,
      });
    }
  };

  //GET SINGLE PRODUCT
  export const getSingleProductController = async (req, res) => {
    try {
      const product = await productModel
        .findOne({ slug: req.params.slug })
        .select("-photo")
        .populate("category");
      res.status(200).send({
        success: true,
        message: "Single Product Fetched",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting single product",
        error,
      });
    }
  };

  //GET PHOTO
  export const productPhotoController = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.pid).select("photo");
      if (product.photo.data) {
        res.set("Content-type", product.photo.contentType);
        return res.status(200).send(product.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting photo",
        error,
      });
    }
  };

  //DELETE CONTROLLER
  export const deleteProductController = async (req, res) => {
    try {
      await productModel.findByIdAndDelete(req.params.pid).select("-photo");
      res.status(200).send({
        success: true,
        message: "Product Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting product",
        error,
      });
    }
  };

  //UPDATE PRODUCT CONTROLLER
  export const updateProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "Photo is required and should be less then 1mb" });
      }
  
      const products = await productModel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Update product",
      });
    }
  };

  //FILTERS
  export const productFiltersController= async (req,res)=> {
    try{
      const {checked, ratio}=  req.body
      let args= {

      }
      if(checked.length>0) args.category= checked       //IN FILTER IT CAN BE POSSIBLE IF HE HAS CHOOSEN ONLY PRICE OR CATEGORY FILTER OR BOTH
      if(radio.length) args.price= {$gte: radio[0], $lte: radio[1]}
      const products= await productModel.find(args);
      res.status(200).send({
        success:true,
        products,
      });
    }catch(error){
      console.log(error);
      res.status(400).send({
        success:false,
        message: "Error while filtering products",
        error
      });
    }
  };

  //PRODUCT COUNT
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// PRODUCT LIST ON BASIS OF PAGE
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per page",
      error,
    });
  }
};

//SEARCH PRODUCT
export const searchProductController= async(req,res)=> {
  try{
    const {keyword}= req.params;
    const results= await productModel.find({
      $or:[                                         //HERE WE ARE SEARCHING THAT WORD IN BOTH NAME AND DESCRIPTION
        {name: {$regex: keyword, $options: "i"}},    //'i' IS USED TO MAKE IT CASE INSENSITIVE
        {description: {$regex: keyword, $options: "i"}},
      ],
    })
    .select("-photo");
    res.json(results);
  }catch(error){
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Search Product API",
      error,
    });
  }
};

//SIMILAR PRODUCT
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },          //THIS SAYS THAT IN SIMILAR PRODUCTS DON'T SHOW THIS PRODUCT
      })  
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while geting related product",
      error,
    });
  }
};