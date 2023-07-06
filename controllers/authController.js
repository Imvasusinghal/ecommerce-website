import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async(req, res) => {        //REQUEST AND RESPONSE TAKEN COZ IT'S A CALL BACK FUNCTION
    try{
        const {name, email, password, phone, address}= req.body
        //VALIDATIONS
        if(!name){
            return res.send({error: "Name is required"});
        }
        if(!email){
            return res.send({error: "Email is required"});
        }
        if(!password){
            return res.send({error: "Password is required"});
        }
        if(!phone){
            return res.send({error: "Phone number is required"});
        }
        if(!address){
            return res.send({error: "Address is required"});
        }

        //CHECK USER
        const existingUser= await userModel.findOne({email})  ;  //FINDING IF EMAIL ALREADY EXIST IN DATABASE

        //CHECKING EXISTING USER BECOZ WE DON'T WANT TO CREATE MULTIPLE ACCOUNT FOR THE SAME USER

        if(existingUser){
            return res.status(200).send({
                success:true,
                message: "Already registered please login",
            });
        }

        //REGISTER USER
        const hashedPassword= await hashPassword(password);

        //SAVE
        const user= await new userModel({
            name, email, phone, address, password: hashedPassword
        }).save();      //HERE KEY IS PASSWORD AND IT'S VALUE 'hashedPassword' THIS MEANS IT'S STORING THE ENCRYPTED PASSWORD

        res.status(201).send({
            success:true,
            message: "User registered successfully",
            user,
        });

    } catch (error){
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error in Registeration',
            error,
        });
    }
};