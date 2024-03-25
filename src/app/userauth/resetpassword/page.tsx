"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
    const [userData, setUserData] = useState({
        password: "",
        confirmPassword: ""
    });
    const route = useRouter();
    const [loading, setLoading] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [error, setError] = useState("");

    // onChange function
    function handleChange(e: any) {
        const { name, value } = e.target;
        setUserData((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    };

    // click function

    async function handleClick() {
        try {
            setLoading(true);
            // check password length
            if (userData.password.length<=6){
                setError("password length should  be 6 or  more than 6")
                return;
            }
            console.log("password empty")
            // chech password
            if (userData.password !== userData.confirmPassword) {
                setError("password does not matched")
                return;
            }
            console.log("password not matched")

            // Create a URLSearchParams object based on the current URL's search parameters
            const params = new URLSearchParams(window.location.search);

            // Get the value of the 'signature' parameter
            const signature = params.get('signature');

            if (!signature || typeof signature !== 'string') {
                toast.error('invalid url');
                return;
            };

            console.log("url",signature)

            // api call
            const resp = await axios.post("/api/users/resetpassword",{password:userData.password,signature});
            if (resp.data){
                toast.success("Password changed successfully!");
                userData.confirmPassword=""
                userData.password=""
                route.push("/userauth/login")
            }

        } catch (error: any) {
            toast.error(error.response?.data?.error || "An error occurred");
            setError(error.response?.data?.error || "An error occurred");
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div className='_frgtp1'>
                <div className='_frgtp2'>
                    <h2>Reset password</h2>
                </div>
                <div className='_frgtp3'>
                    <div className='_frgtp4'>
                        <label htmlFor="_one1">Enter Password</label>
                        <input type="password" placeholder='Enter password...' id="_one1" name="password" value={userData.password} onChange={handleChange} />
                    </div>
                    <div className='_frgtp4'>
                        <label htmlFor="_one2">Enter Confirm Password</label>
                        <input type="password" placeholder='Enter Confirm Password...' id="_one2" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />
                    </div>
                    {error && <p style={{color:"red",textAlign:"center",fontSize:"14px",padding:"6px 0px"}}>{error}</p>}
                    <button className='_frgtp5' onClick={handleClick}>{loading ? "Processing..." : "Reset password"}</button>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default page