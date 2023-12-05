import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/UserSlice";
import wishListSlice from "./Slices/WishlistSlice";
import PropertySlice from "./Slices/PropertySlice";

const store=configureStore({
    reducer:{
        users:userSlice,
        wishList:wishListSlice,
        properties:PropertySlice
    },
   
})

export default store;

