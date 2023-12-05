import React from 'react'
import House from '../components/House'
import FilterSlideBar from '../components/FilterSlideBar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {setPropertyInfo} from '../Store/Slices/PropertySlice'


const Houses = () => {

  const userData=useSelector((state) => {return state.users})
  const dispatch = useDispatch()
  useEffect( () => {
    // window.scrollTo(0, 0)
    getHouses()
   
  }, [])
  
  const data=useSelector((state) => {return state.properties})
  const getHouses = async () => {
    const res = await fetch("/api/property/showall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${userData.accessToken}`,
      },
    })
    const resdata = await res.json()
    console.log(resdata)
    
    dispatch(setPropertyInfo(resdata))
  }
 
  return (
    <>
    <div className='flex '>
    <FilterSlideBar/>

    <section  className='bg-white flex  justify-center  ' style={{marginLeft:'125px'}}>
            <div  style={{marginTop:'90px'}}>
              {
                data.propertyInfo.map((item)=>{
                  return(
                    <House propertyInfo={item}/>
                  )
                }
                )
                
              }
                </div>
       
    </section>
    </div>
    </>
  )
}

export default Houses