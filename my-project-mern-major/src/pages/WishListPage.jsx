import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {useAlert} from 'react-alert'
import {useDispatch} from 'react-redux'
import {addToWishList} from '../Store/Slices/WishlistSlice';
import WishlistCardCompo from "../components/WishlistCardCompo";

const WishListPage = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("useeffect")
    getWishlist()
  },[count])
  const userData = useSelector((state) => {
    return state.users;
  });
  // const wishListData=useSelector((state) => {
  //   return state.wishList;
  // })
  let  resdata=""
  const getWishlist = async () => {
    const res = await fetch("/api/wishlist/showall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${userData.accessToken}`,
      },
     
    });
    resdata = await res.json();
    if(resdata.success===false){
      alert.info(resdata.message)

      return;
    }
    else{
      setData(resdata.wishlist);

    }
   
  }
  return (
    <>
      <div className="flex">
        <div style={{ marginTop: "60px" }}>
          <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 
          xl:grid-cols-3 gap-5">
            {
              data.length<0?<div className='flex justify-center items-center'><h1 className='text-2xl'>No Property in Wishlist</h1></div>:
              data.map((e)=>{
                return <WishlistCardCompo setCount={setCount} propertyInfo={e}/>
              })
            }
          
          </div>
        </div>
      </div>
    </>
  );
};

export default WishListPage;
