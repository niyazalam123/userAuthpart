"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const page = () => {
    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        password: ""
    });
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error,setError]= useState<string  | any>("");
    const route = useRouter();

    // click function
    async function handleSignup() {
        try {
            setLoading(true);
            const resp = await axios.post("/api/users/signup",userData);
            if(resp.statusText){
                toast.success('user created successfully');
                route.push("/userauth/login");
                userData.userName="";
                userData.email="";
                userData.password=""
            }
        } catch (error:any) {
            setError(error.response?.data?.error || "An error occurred");
        }finally{
            setLoading(false);
        }
    }

    // btn will not click until user fill all data
    useEffect(() => {
        if (userData.userName.length > 1 && userData.email.length > 1 && userData.password.length > 1) {
            setBtnDisabled(false)
        }
        else {
            setBtnDisabled(true)
        }
    }, [userData])

    return (
        <>
            <div className='_name1'>
                <h3>Signup here</h3>
                <div className='_name2'>
                    <label htmlFor="_one1">Enter UserName</label>
                    <input
                        type="text"
                        placeholder='Enter UserName'
                        id="_one1"
                        name="userName"
                        value={userData.userName}
                        onChange={(e: any) => setUserData((prev) => ({ ...prev, userName: e.target.value }))}
                        required
                    />
                </div>
                <div className='_name2'>
                    <label htmlFor="_one2">Enter Email</label>
                    <input
                        type="email"
                        placeholder='Enter Email'
                        id="_one2"
                        name="email"
                        value={userData.email}
                        onChange={(e: any) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                        required
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
                        onChange={(e: any) => setUserData((prev) => ({ ...prev, password: e.target.value }))}
                        required
                    />
                </div>
                {error && <span style={{display:"block",color:"red",textAlign:"center",fontSize:"12px",margin:"0px 4px 6px"}}>{error}</span>}
                <button className='_name3' onClick={handleSignup}
                    disabled={btnDisabled ? true : false}
                    style={{ opacity:`${btnDisabled?".6":"1"}`,cursor:`${btnDisabled ? "no-drop" : "pointer"}`}}>{loading?"Processing...":"SignUp"}</button>
                <Link href="/userauth/login" className='_name4'>Already have account? <span>Login</span></Link>
            </div>
            <Toaster />
        </>
    )
}

export default page