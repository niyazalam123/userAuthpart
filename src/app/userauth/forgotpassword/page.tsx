"use client";
import React from 'react'

const page = () => {
    return (
        <>
            <div className='_frgtp1'>
                <div className='_frgtp2'>
                    <h2>Forgot password</h2>
                    <p>Enter your credential! we will send you link in your mail for forgot password!</p>
                </div>
                <div className='_frgtp3'>
                    <div className='_frgtp4'>
                        <label htmlFor="_one1">Enter UserName</label>
                        <input type="text" placeholder='Enter UserName...' id="_one1" />
                    </div>
                    <button className='_frgtp5'>Forgot password</button>
                </div>
            </div>
        </>
    )
}

export default page