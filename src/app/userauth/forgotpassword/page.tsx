"use client";
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const [message,setMessage] = useState(false);

    async function handleForgotPassword(){
        try {
            setLoading(true);
            if (email.length<1){
                setError("Enter valid email");
                return;
            }
            const resp = await axios.post("/api/users/forgotpassword",{email});
            if(resp.data){
                toast.success("check your email!link send to your email");
                setMessage(true);
                setEmail("");
            }
        } catch (error:any) {
            setError(error.response?.data?.error || "An error occurred");
            toast.error(error.response?.data?.error);
        }finally{
            setLoading(false);
        }
    }

    return (
        <>
            <div className='_frgtp1'>
                <div className='_frgtp2'>
                    <h2>Forgot password</h2>
                    <p>Enter your credential! we will send you link in your mail for forgot password!</p>
                </div>
                <div className='_frgtp3'>
                    <div className='_frgtp4'>
                        <label htmlFor="_one1">Enter Email</label>
                        <input type="email" placeholder='Enter Email...' id="_one1"  onChange={(e)=>setEmail(e.target.value)} name="email" value={email} />
                    </div>
                    {
                        message && <p style={{color:"green",textAlign:"center",padding:"6px 0px"}}>we have send you an email for reset password</p>
                    }
                    {
                        error && <p style={{color:"red",textAlign:"center",padding:"6px 0px"}}>{error}</p>
                    }
                    <button className='_frgtp5' onClick={handleForgotPassword}>{loading?"Processing...":"Forgot password"}</button>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default page