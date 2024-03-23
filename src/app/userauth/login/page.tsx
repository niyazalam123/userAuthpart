"use client";
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
    const [userData,setUserData] = useState({
        userName:"",
        password:""
    });
    return (
        <>
            <div className='_name1'>
                <h3>Login here</h3>
                <div className='_name2'>
                    <label htmlFor="_one1">Enter UserName</label>
                    <input
                        type="text"
                        placeholder='Enter UserName'
                        id="_one1"
                        name="userName"
                        value={userData.userName}
                        onChange={(e:any) => setUserData((prev) => ({ ...prev, userName: e.target.value }))}
                    />
                </div>
                <div className='_name2'>
                    <label htmlFor="_one3">Enter Password</label>
                    <input
                        type="password"
                        placeholder='Enter Password'
                        id="_one3"
                        name="password"
                        value={userData.password}
                        onChange={(e:any) => setUserData((prev) => ({ ...prev, password: e.target.value }))}
                    />
                </div>
                <button className='_name3'>SignUp</button>
                <Link href="/userauth/signup" className='_name4'>Dont have account? <span>Signup</span></Link>
            </div>
        </>
    )
}

export default page