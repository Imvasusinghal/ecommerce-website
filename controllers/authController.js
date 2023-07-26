// import { comparePassword, hashPassword } from "../helpers/authHelper.js";
// import userModel from "../models/userModel.js";
// import JWT from "jsonwebtoken";

// export const registerController = async(req, res) => {        //REQUEST AND RESPONSE TAKEN COZ IT'S A CALL BACK FUNCTION
//     try{
//         const {name, email, password, phone, address, answer}= req.body
//         //VALIDATIONS
//         if(!name){
//             return res.send({message: "Name is required"});
//         }
//         if(!email){
//             return res.send({message: "Email is required"});
//         }
//         if(!password){
//             return res.send({message: "Password is required"});
//         }
//         if(!phone){
//             return res.send({message: "Phone number is required"});
//         }
//         if(!address){
//             return res.send({message: "Address is required"});
//         }
//         if(!answer){
//             return res.send({message: "Answer is required"});
//         }

//         //CHECK USER
//         const existingUser= await userModel.findOne({email})  ;  //FINDING IF EMAIL ALREADY EXIST IN DATABASE

//         //CHECKING EXISTING USER BECOZ WE DON'T WANT TO CREATE MULTIPLE ACCOUNT FOR THE SAME USER

//         if(existingUser){
//             return res.status(200).send({
//                 success:false,
//                 message: "Already registered please login",
//             });
//         }

//         //REGISTER USER
//         const hashedPassword= await hashPassword(password);

//         //SAVE
//         const user= await new userModel({
//             name, email, phone, address, password: hashedPassword
//         }).save();      //HERE KEY IS PASSWORD AND IT'S VALUE 'hashedPassword' THIS MEANS IT'S STORING THE ENCRYPTED PASSWORD

//         res.status(201).send({
//             success:true,
//             message: "User registered successfully",
//             user,
//         });

//     } catch (error){
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message:'Error in Registeration',
//             error,
//         });
//     }
// };

// //POST LOGIN
// export const loginController = async(req,res) => {
//     try{
//         const {email, password} = req.body;         //req.body MEANS TO GET THESE FROM BODY
//         //VALIDATION
//         if(!email || !password){
//             return res.status(404).send({
//                 success:false,
//                 message: "Invalid email or password",
//             });
//         }

//         //CHECK USER IF PRESENT OR NOT
//         const user= await userModel.findOne({email});
//         if(!user){
//             return res.status(404).send({
//                 success:false,
//                 message: "Email is not registered",
//             });
//         }

//         //HERE DECRYPTING THE PASSWORD AND COMPARING IF IT'S THE RIGHT PASSWORD OR NOT
//         const match = await comparePassword(password, user.password)
//         if(!match){
//             return res.status(200).send({
//                 success:false,
//                 message:"Invalid Password",
//             });
//         }

//         //CREATING TOKEN
//         const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: "7d",
//         });
//         res.status(200).send({
//             success:true,
//             message:"Login successfully",       
//             user:{
//                 name: user.name,             //HERE WE'RE SHOWING THE USER THESE DETAILS AFTER SUCCCESSFUL LOGIN
//                 email: user.email,
//                 phone: user.phone,
//                 address: user.address,
//                 role: user.role,
//             },
//             token,
//         });
//     } catch(error){
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:"Error in login",
//             error,
//         });
//     }
// };

// //FORGOT PASSWORD

// export const forgotPasswordController = async(req, res) => {
//     try{
//         const {email, answer, newPassword} = req.body
//         if(!email){
//             res.status(400).send({message: 'Email is required'});
//         }
//         if(!answer){
//             res.status(400).send({message: 'Question is required'});
//         }
//         if(!newPassword){
//             res.status(400).send({message: 'New Password is required'});
//         }

//         //CHECKING IF EMAIL AND ANSWER ARE RIGHT

//         const user= await userModel.findOne({email, answer});

//         //VALIDATION 
//         if(!user){
//             return res.status(404).send({
//                 success: false,
//                 message: 'Wrong email or answer',
//             });
//         }

//         // IF RIGHT THEN SENDING THE NEW PASSWORD TO HASH IT
//         const hashed= await hashPassword(newPassword);

//         //HERE FINDING THE SAME ID AND UPDATING THE PASSWORD TO NEW PASSWORD
//         await userModel.findByIdAndUpdate(user._id,{password:hashed});

//         res.status(200).send({
//             success: true,
//             message: "Password Reset Successfully",
//         });

//     } catch(error){
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:'Something went wrong',
//             error,
//         });
//     }
// };

import userModel from "../models/userModel.js";
// import orderModel from "../models/orderModel.js";

import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "200d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


//TEST CONTROLLER
export const testController= (req,res) => {
    // console.log("protexted Route");
    res.send("Protected routes");
};

//UPDATE PROFILE
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update profile",
      error,
    });
}
};