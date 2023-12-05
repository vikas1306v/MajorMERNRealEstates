import React from 'react'
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'


const WishlistCardCompo = (props) => {
  const {propertyInfo,setCount}=props
  const alert = useAlert()

  const userData=useSelector((state) => {return state.users})
  const handlesubmit=async ()=>{
    // window.location.reload();
  
    const res = await fetch("/api/wishlist/removefromwishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${userData.accessToken}`,
      },
      body: JSON.stringify({user_id:userData.id, propertyId: propertyInfo._id }),
    })
    const resdata = await res.json()
    console.log(resdata)
    if(resdata.success===false){
      if(resdata.message==="Property not in wishlist")
      {
       
        alert.info("Property not in wishlist");
        return;
      }
      alert.error(resdata.message);
      return;
    }
    alert.info("Removed from wishlist");
  
  }
  return (
   <>
   
   <div class="rounded overflow-hidden shadow-lg  m-4">
      <img class="w-full" src={propertyInfo.images[0]} alt="River"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{propertyInfo.society}</div>
        <p class="text-gray-700 text-base">
        {propertyInfo.full_address}
        </p>
      </div>
      
      <div class="px-6 pt-4 pb-2">
        <h1  className='mb-2'>Description</h1>
        <span class="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{propertyInfo.description}</span>
             </div>
      <div  className='flex justify-center m-2 p-1 mb-4'>
      <button onClick={()=>{setCount((prev)=>prev+1),handlesubmit()}} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
  Remove From Wishlist
</button>
      </div>
    </div>
   </>
  )
}

export default WishlistCardCompo