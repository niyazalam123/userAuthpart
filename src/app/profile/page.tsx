"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);

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
  }

  return (
    <>
      <div className='_prof1'>
        <div className='_prof2'>
          <h1 className='_prof3'>Welcome to profile page Niyaz</h1>
        </div>
        <div className='_prof4'>
          <h4>Niyaz</h4>
          <button onClick={handleLogout}>{loading ? "Processing...":"Logout"}</button>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default page