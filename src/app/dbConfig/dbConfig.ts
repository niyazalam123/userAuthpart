import mongoose from "mongoose";

export async function mongoDbConnect(){
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        // connection successfull event 

        connection.on("connected",()=>{
            console.log("mongodb connected successfully!")
        });

        // connection failed error event 

        connection.on("error",(err)=>{
            console.error("MongoDB connection error:", err);
        });

        connection.on("disconnected", () => {
            console.log("MongoDB disconnected!");
        });

    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
} 