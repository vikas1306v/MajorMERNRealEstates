import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
const Home = () => {
  const alert=useAlert();
  const data=useSelector((state)=>state.users);
  const handleHousesClick=()=>{
    if(!data.accessToken)
    {
          alert.show('Please Login First');
    }

  }
  return (
  <>
  <div className='bg-slate-900 ' style={{ height:'100vh'}} >
    <div className='flex  flex-col '>

    <div style={{marginTop:'145px'}} className='ml-12 p-4'>
      <h1 className='text-slate-400 text-5xl flex flex-col'>
        <span>Find your next <span  className='text-slate-600'>perfect</span></span>
        <span>place with ease</span>
      </h1>
    </div>
    <div   className='ml-12  pl-4 pb-4 '>
      <h1 className='flex flex-col text-slate-400 text-xl'>
        <span className='leading-4 '>Experience modern elegance in this newly-built residence</span>
        <span>Situated in a quiet neighborhood, it offers a perfect retreat while still being close to urban conveniences.</span>
      </h1>
    </div>
    <div  className='ml-12 pl-4 pb-4 mt-3 '>

      <Link onClick={handleHousesClick} to='/houses' className='bg-slate-400 text-white rounded-lg p-3'>Get Started</Link>
    </div>
    </div>
  
    </div>
  </>
  )
}

export default Home