import React, { useState } from "react";
import { AiOutlineRise } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";

import { useAlert } from "react-alert";
import SellerModal from "./SellerModal";
import AddHomeModal from "./AddHomeModal";
import { useSelector } from "react-redux";

const House = (props) => {
  const { propertyInfo } = props;
  const { images } = propertyInfo;
  
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const userInfo=useSelector((state) => {return state.users})
  const [like, setLike] = useState(false);
  const alert = useAlert();

  const wishList =async  () => {
    if (like) {
      const resData= await fetch("/api/wishlist/removefromwishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${userInfo.accessToken}`,
        },
        body: JSON.stringify({user_id:userInfo.id, propertyId: propertyInfo._id }),
      })
      const res=await resData.json()
      if(res.success===false){
        if(res.message==="Property not in wishlist")
        {
          setLike(false);
          alert.info("Property not in wishlist");
          return;
        }
        alert.error(res.message);
        return;
      }
      alert.info("Removed from wishlist");
      setLike(false);
    } else {
     const resData= await fetch("/api/wishlist/addpropertytowishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${userInfo.accessToken}`,
        },
        body: JSON.stringify({user_id:userInfo.id, propertyId: propertyInfo._id }),
     })
      const res=await resData.json()
      if(res.success===false){

        if(res.message==="Property already in wishlist")
        {
          setLike(true);
          alert.info("Property already in wishlist");
          return;
        }
        alert.error(res.message);
        return;
      }
      setLike(true);
      alert.info("Added to wishlist");
    }
  };


  return (
    <>
      <div
        className="bg-gray-50 border border-slate-500 rounded-lg shadow-md hover:bg-slate-100
     dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 "
        style={{ width: "60vw", margin: "10px", marginTop: "20px" }}
      >
        <div className="ml-4 mt-2  text-xl flex justify-between">
          <div className="flex text-green-600">
            <AiOutlineRise className="mt-1" />{" "}
            <h1 className=" ml-2 mb-1">FEATURED</h1>
          </div>
          <div className="mr-5">
            <button onClick={wishList}>
              {like ? (
                <IoIosHeartEmpty className="text-red-600" />
              ) : (
                <IoIosHeartEmpty className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
        <hr />

        <div className="flex">
          <Link to="/singleproduct">
            <img src={images[0]} className="image_house w-60 m-2 h-40 rounded-md"></img>
          </Link>
          <div className="content m-2">
            <div>
              <h1 className="text-xl font-bold">LP {propertyInfo.lower_price }cr - HP {propertyInfo.upper_price }cr</h1>
            </div>
            <div>
              <span className="font-semibold">{propertyInfo.society}</span>{" "}
            </div>
            <div className="w-full">
              {propertyInfo.full_address
}
            </div>
            <div>
              <span className="font-semibold">{propertyInfo.bhk_type} BHK</span>
            </div>
            <div>
            Owner Email-
              <span className="font-semibold text-red-600">{userInfo.email}</span>
            </div>
            <div className="mt-3">
              <button
                onClick={() => setOpenModal(true)}
                className="bg-green-400 hover:bg-green-600 text-white font-bold mx-2 py-2 px-4 rounded"
              >
                Contact Seller
              </button>
              <button
                onClick={() => setOpenModal1(true)}
                className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                More Details
              </button>
            </div>
          </div>
        </div>

        {/* seller ke lie number chye */}
        <SellerModal setOpenModal={setOpenModal} openModal={openModal} />
        <AddHomeModal property={propertyInfo}  openModal1={openModal1} setOpenModal1={setOpenModal1} />
      </div>
    </>
  );
};

export default House;
