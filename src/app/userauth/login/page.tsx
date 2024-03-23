"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const page = () => {
    const [userData, setUserData] = useState({
        userName: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const route = useRouter();
    const [error, setError] = useState<any>("");

    // user can not  click on button without filling data
    useEffect(() => {
        const { userName, password } = userData;
        if (userName.length > 1 && password.length > 1) {
            setBtnDisabled(false);
        }
        else {
            setBtnDisabled(true)
        }
    }, [userData]);

    // login function code
    async function handleLogin() {
        try {
            setLoading(true);
            const resp = await axios.post("/api/users/login", userData);
            if (resp.data) {
                toast.success('Login successfully!');
                route.push("/profile");
                userData.userName = "";
                userData.password = "";
            }
        } catch (error: any) {
            console.log("error", error);
            setError(error.response?.data?.error || "userName and password does not matched");
        }
        finally {
            setLoading(false);
        }
    }

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
                        onChange={(e: any) => setUserData((prev) => ({ ...prev, userName: e.target.value }))}
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
                    />
                </div>
                {error && <span style={{ color: "red", display: "block", textAlign: "center", margin: "0px 4px 6px", fontSize: "12px" }}>{error}</span>}
                <button className='_name3'
                    disabled={btnDisabled ? true : false}
                    style={{ opacity: `${btnDisabled ? ".6" : "1"}`, cursor: `${btnDisabled ? "no-drop" : "pointer"}` }}
                    onClick={handleLogin}
                >{loading ? "Processing..." : "Login"}</button>
                <Link href="/userauth/signup" className='_name4'>Dont have account? <span>Signup</span></Link>
            </div>
            <Toaster />
        </>
    )
}

export default page