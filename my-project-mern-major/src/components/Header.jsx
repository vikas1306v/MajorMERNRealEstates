import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
const Header = () => {
   
    const data=useSelector((state)=>{
        return state.users
    })
   
    
  return (
    <><header>
       

            <div  className='flex justify-between bg-slate-300 shadow-sm fixed w-full z-50' >
                <h1  className='text-2xl ml-12 pt-4 pl-3 hover:cursor-pointer'  >
                    <span className='text-blue-600 '>Real</span>
                    <span className='text-blue-900'>Estates</span>
                </h1>

                <form className='p-2' >
                    <input type='text' placeholder='Search' className='border-2 border-gray-300 p-1 rounded-lg mt-1 focus:outline-none'  />
                    <button className='bg-blue-400 text-white p-1 rounded-lg ml-1'>
                        <FaSearch />
                        </button>   
                </form>
                <ul className='flex space-x-2 mr-8 p-2 text-xl' >
                <li className='p-2 hover:text-white'><Link to='/'>Home</Link></li>
                    <li className='p-2 hover:text-white'><Link to='/about'>About</Link></li>
                    <li className='p-2 hover:text-white'><Link to='/contact'>Contact</Link></li>
                    
                    {
                        data.accessToken?<li className='p-1 hover:text-white'
                        ><Link to='/profile'><img className="object-cover w-9 rounded-full"src={data.avatar}></img></Link></li>:<li className='p-2 hover:text-white'><Link to='/signup'>Sign Up</Link></li>
                    }
                    {
                        data.accessToken?null:<li  className='p-1 hover:text-white'><Link to='/login'>
                        <div className='bg-blue-500
                         hover:bg-blue-700 text-white font-bold rounded p-1 '>Login
                        </div>
                        </Link>
                        </li>
                    }
                   
                  
                    </ul>
            </div>


    </header>
        </>
        
  )
}

export default Header