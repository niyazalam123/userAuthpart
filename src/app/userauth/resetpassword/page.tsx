"use client";
import React from 'react'

const page = () => {
    return (
        <>
            <div className='_frgtp1'>
                <div className='_frgtp2'>
                    <h2>Reset password</h2>
                </div>
                <div className='_frgtp3'>
                    <div className='_frgtp4'>
                        <label htmlFor="_one1">Enter Password</label>
                        <input type="text" placeholder='Enter password...' id="_one1" />
                    </div>
                    <div className='_frgtp4'>
                        <label htmlFor="_one2">Enter Confirm Password</label>
                        <input type="text" placeholder='Enter Confirm Password...' id="_one2" />
                    </div>
                    <button className='_frgtp5'>Reset password</button>
                </div>
            </div>
        </>
    )
}

export default page