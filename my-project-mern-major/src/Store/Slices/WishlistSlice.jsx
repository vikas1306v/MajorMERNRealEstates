import {createSlice}  from "@reduxjs/toolkit";
const initialState={
    wishlist:[]
}
const wishListSlice=createSlice(
    {
        name:"wihslist",
        initialState,
        reducers:{
            addToWishList:(state,action)=>{
                state.wishlist.push(action.payload)
            },
            removeFromWishList:(state,action)=>{
                state.wishlist=state.wishlist.filter((e)=>{return e._id!==action.payload})
            },
        }
    }
)


export const {addToWishList,removeFromWishList}=wishListSlice.actions;
export default wishListSlice.reducer
