import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {applyFilter,removeFilter} from '../Store/Slices/PropertySlice'
import {useAlert} from 'react-alert'



const FilterSlideBar = () => {
    const alert=useAlert()
    const userData=useSelector((state) => {return state.users})
    const dispatch = useDispatch()
    const propertyInfo=useSelector((state) => {return state.properties})
  
    const removefilter=async(e)=>{
        const res= await fetch("/api/property/showall", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": `${userData.accessToken}`,
            },
            
          })
          const resdata =await  res.json()
          dispatch(removeFilter(resdata))
            alert.success("Filter Removed")
    }
    const handlefacing=async(e)=>{
        // console.log(e)
        const res= await fetch("/api/property/filterbyfacing", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": `${userData.accessToken}`,
            },
            body: JSON.stringify({facing: e }),
          })
          const resdata =await  res.json()
          dispatch(applyFilter(resdata.properties))
          if(resdata.properties.length===0)
          {
            alert.error(resdata.message)
            return;
          }
          
          alert.success("Filter Applied")
    }
    const handlebathrooms=async(e)=>{
        console.log(e)
        const res=await  fetch("/api/property/filterbybathrooms", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": `${userData.accessToken}`,
            },
            body: JSON.stringify({bathrooms: e }),
          })
          const resdata = await res.json()
          dispatch(applyFilter(resdata.properties))
          if(resdata.properties.length===0)
          {
            alert.error(resdata.message)
            return;
          }
          alert.success("Filter Applied")

    }
   const handleBhkType=async (e)=>{
    const res=await fetch("/api/property/filterbybhk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${userData.accessToken}`,
        },
        body: JSON.stringify({bhk_type: e }),
      })
      const resdata = await res.json()
    //   console.log(resdata)
      dispatch(applyFilter(resdata.properties))
      if(resdata.properties.length===0)
      {
        alert.error("No Property Found with this filter")
        return;
      }
      
        alert.success("Filter Applied")
    }

  return (
    <>
    <div className='bg-slate-200 ' > 
      <aside className="h-screen sticky top-0  rounded-sm boder-2 border-slate-600 " style={{marginTop:'65px',width:'290px'}}>
      <div >
        <div className='flex justify-center'>
          <h2 class="text-xl font-bold mt-16 ">Filters</h2>
        </div>
{/*     
        <div className='m-2'>
            <label for="category" class="block text-sm font-medium text-gray-600">Property Type</label>
            <select id="category" class="mt-2 p-2 w-full border rounded-md bg-gray-300"
            onChange={(e)=>handleFilterType(e.target.value)}>
              
                <option value="apartment">apartment</option>
                <option value="Villa">Villa</option>
                <option value="plot">plot</option>
                <option value="Studio">Studio</option>
               
            </select>
        </div> */}
     
        <div className='m-2'>
            <label for="category" class="block text-sm font-medium text-gray-600">BHK Type</label>
            <select id="category" class="mt-2 p-2 w-full border rounded-md bg-gray-300"
            onChange={(e)=>handleBhkType(e.target.value)}>
              
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
               
            </select>
        </div>
        <div className='m-2'>
            <label for="category" class="block text-sm font-medium text-gray-600">Facing</label>
            <select id="category" class="mt-2 p-2 w-full border rounded-md bg-gray-300"
            onChange={(e)=>handlefacing(e.target.value)}>
              
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="South">South</option>
               
            </select>
        </div>       
        <div className='m-2'>
            <label for="category" class="block text-sm font-medium text-gray-600">Bathrooms</label>
            <select id="category" class="mt-2 p-2 w-full border rounded-md bg-gray-300"
            onChange={(e)=>handlebathrooms(e.target.value)}>
              
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
            </select>
        </div>       
        <div className='m-2 mt-4'>
            <label for="priceRange" class="block text-sm font-medium text-gray-600">Price Range</label>
            <input type="range" id="priceRange" min="0" max="1000" step="10" class="mt-1 w-full"/>
        </div>
   
        <div className='mt-5 ml-24 space-x-4' >
        <button onClick={removefilter}
         class="bg-red-500 text-white p-2 rounded-md">Remove Filter</button>
         </div>
        
   
       
    </div>

   
     
    </aside>


    </div>

    
    </>
  )
}

export default FilterSlideBar