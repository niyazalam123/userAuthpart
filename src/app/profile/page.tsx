"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData,setUserData] = useState<any>("");

  async function handleLogout() {
    try {
      setLoading(true)
      const resp = await axios.get("/api/users/logout");
      if (resp.data) {
        toast.success('Logout Successfully!');
        route.push("/userauth/login");
      }
    } catch (error) {
      console.log("error", error);
      toast.error('unable to logout!try again');
    }
    finally {
      setLoading(false);
    }
  };

  // fetching user data from api and store it into state
  useEffect(()=>{
    async function getUserData(){
      try {
        const data = await axios.get("/api/users/userData");
        if (data.data){
          setUserData(data.data.data);
        }
      } catch (error) {
        console.log(error);
        toast.error('unable to find user!');
      }
    };
    getUserData();
  },[])

  return (
    <>
      <div className='_prof1'>
        <div className='_prof2'>
          <h1 className='_prof3'>Welcome to profile page {userData.userName}</h1>
        </div>
        <div className='_prof4'>
          <h4>{userData.userName}</h4>
          <button onClick={handleLogout}>{loading ? "Processing..." : "Logout"}</button>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default page