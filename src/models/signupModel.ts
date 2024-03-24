import mongoose from "mongoose";

const userDataModel = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'userName is required'],
        unique: [true,'userName is already exists! Enter new userName'],
    },
    email:{
        type:String,
        unique: [true,'Email is already exist! new new Email'],
        required: [true, 'Email is required'],
    },
    password:{
        type:String,
        required: [true, 'password is required'],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifyToken:String,
    verifyTokenExpiry:Date,
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
},{ timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userDataModel);
export default User;