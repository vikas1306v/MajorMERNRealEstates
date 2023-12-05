import React from 'react'
import { useState } from 'react'
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
const ForgotPassword = () => {
    const alert=useAlert()
    const navigate=useNavigate()

    const [formData,setFormData]=useState({})

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();

        const res=await fetch('/api/users/forgotpassword',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        })

        const data=await res.json();
        if(data.success==true){
            alert.success('Email Sent Successfully to your email address please check your email to reset your password')
             return;
        }
        else{
            alert.error(data.error)
        }
        console.log(data);
    }
  return (
   <>
   <div  className='flex justify-center'>
    <div className="mt-24">
    <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h1 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot your password?
          </h1>
          <p class="font-light text-gray-500 dark:text-gray-400">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
          <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""  onChange={handleChange}/>
              </div>
              <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
              </div>
              <button type="submit" class="w-full text-black bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset password</button>
          </form>
      </div>
  </div>
</section>
    </div>


   </div>
   
   </>
  )
}

export default ForgotPassword