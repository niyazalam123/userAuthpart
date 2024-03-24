"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const route = useRouter();

  async function handleVerify() {
    try {
      // Create a URLSearchParams object based on the current URL's search parameters
      const params = new URLSearchParams(window.location.search);

      // Get the value of the 'signature' parameter
      const signature = params.get('signature');
      console.log("signature", signature)

      if (!signature || typeof signature !== 'string') {
        toast.error('invalid url');
        return;
      }
      // Call the API to verify the user
      setLoading(true);
      const resp = await axios.post('/api/users/userverify', { signature });
      if (resp.data) {
        toast.success('user verified successfully!');
        route.push("/userauth/login")
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error);
      setError(error.response?.data?.error || 'Error verifying user');
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='_vryfu1'>
        <h2 className='_vryfu2'>Verify Your Email Address</h2>
        <button className='_vryfu3' onClick={handleVerify}>Click To Verify</button>
      </div>
      <Toaster />
    </>
  )
}

export default page