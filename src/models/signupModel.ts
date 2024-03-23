import mongoose from "mongoose";

const userDataModel = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'userName is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    email:{
        type:String,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type:String,
        trim: true,
        lowercase: true
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