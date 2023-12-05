import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'


const ResetPassword = () => {
   
    const alert=useAlert()
    const navigate=useNavigate()
    const {id,token}=useParams()
    const [formData,setFormData]=useState({})
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res=await fetch(`/api/users/resetpassword/${id}/${token}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        })
        const data=await res.json();
        console.log(data);
        if(data.success==true){
           alert.success('Password Reset Successfully Please Login')
              navigate('/login')
        }else{
            alert.error(data.error)
        }
    }


  return (
   <><div  className='flex justify-center'>
    <div className='mt-14'>


<body class="antialiased bg-slate-200">
    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 class="text-4xl font-medium">Enter Password</h1>
        <p class="text-slate-500">Fill up the form to set new password</p>

        <form action="" class="my-10"  onSubmit={handleSubmit}>
            <div class="flex flex-col space-y-5">
                <label for="email">
                    <p class="font-medium text-slate-700 pb-2">New Password</p>
                    <input id="password" name="password" type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter Password Here" onChange={handleChange}/>
                </label>
               
                <button class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                      </svg>
                      
                      <span>Submit</span>
                </button>
                
            </div>
        </form>
    </div>
    
</body>
    </div>
    </div></>
  )
}

export default ResetPassword