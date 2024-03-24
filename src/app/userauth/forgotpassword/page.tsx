"use client";
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,seterror] = useState("");

    async function handleForgotPassword(){
        
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
                    <button className='_frgtp5' onClick={handleForgotPassword}>{loading?"Processing...":"Forgot password"}</button>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default page