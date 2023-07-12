import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true           //REMVOE WHITE SPACES
    },
    email:{
        type:String,
        required:true,
        unique:true         //SO THAT ONLY 1 USER CAN LOGIN FROM ONE EMAIL
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    answer:{
        type: String,
        required: true,
    },
    role:{
        type:Number,
        default:0
    }
},
{timestamps:true}     //IT'S DONE SO THAT WHEN NEW USER IS CREATED IT STORE IT'S TIMESTAMP
);        

export default mongoose.model('users', userSchema)