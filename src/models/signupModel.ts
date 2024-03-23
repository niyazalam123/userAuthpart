import mongoose from "mongoose";

const userDataModel = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'userName is required'],
        unique: true,
    },
    email:{
        type:String,
        unique: true,
        required: [true, 'email is required'],
    },
    password:{
        type:String,
        required: [true, 'password is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date
});

const User = mongoose.models.User || mongoose.model('User', userDataModel);
export default User;