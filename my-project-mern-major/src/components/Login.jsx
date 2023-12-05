import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Outh from './Oauth';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Store/Slices/UserSlice';
import { useAlert } from 'react-alert';
const Login = () => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const navigate=useNavigate();


    const [disabled,setDisabled]=useState(true)
    const [formData,setFormData]=useState({})

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
    }

    const handlecheckBox=(e)=>{
        const value=e.target.checked;
        if(value)
        {
            setDisabled(false)
        }else{
            setDisabled(true)
        }

    }

    const submittedForm=async(e)=>{
        e.preventDefault();
        alert.info("Please Wait")
        const res=await fetch("/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        
        })
        const data=await res.json();
        if(data.success==true)
        {
            dispatch(loginUser(data))
            alert.success("Login Successfull")
            navigate('/')
        }else{
            alert.error(data.error)
        }

       
    }
  return (
    <><div className='flex justify-center bg-slate-200 ' >
        <div  >
        <section className=" dark:bg-gray-900 mt-14  " >
      <div style={{width:'80vw'}} className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
         
          <div  className="w-full bg-white  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-3 md:space-y-6 sm:p-8 ">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6"onSubmit={submittedForm}>
                      <div>
                          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" name="email" id="email" 
                          className="bg-gray-50 border 
                          border-gray-300
                           text-gray-900 sm:text-sm rounded-lg 
                           focus:ring-primary-600 focus:border-primary-600
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                             dark:placeholder-gray-400 dark:text-white 
                             dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="name@company.com" required="" onChange={handleChange}/>
                      </div>
                      <div>
                          <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" name="password" id="password"
                           placeholder="••••••••" className="bg-gray-50 border
                            border-gray-300 text-gray-900 sm:text-sm rounded-lg
                             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.
                              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""  onChange={handleChange}/>
                      </div>
                      <div className="flex items-center justify-between">
                          <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox" onClick={(e)=>handlecheckBox(e)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                              </div>
                              <div className="ml-3 text-sm">
                                <label for="remember" className="text-gray-500 dark:text-gray-300" >Check me </label>
                              </div>
                          </div>
                          <Link to='/forgotpassword'className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                      </div>
                      <button type="submit" disabled={disabled} 
                       className="w-full text-white bg-slate-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                    
                     
                  </form>
                  <Outh/>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet? <Link to='/signup' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                      </p>
              </div>
          </div>
      </div>
    </section>
        </div>

    
        </div>
        </>
  )
}

export default Login