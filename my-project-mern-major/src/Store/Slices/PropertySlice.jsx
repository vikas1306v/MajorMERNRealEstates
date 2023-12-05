import {createSlice}  from "@reduxjs/toolkit";
const initialState={
    propertyInfo:[],
   
}
const propertySlice=createSlice(
    {
        name:"property",
        initialState,
        reducers:{
            setPropertyInfo:(state,action)=>{
                state.propertyInfo=action.payload
            },
            applyFilter:(state,action)=>{
                state.propertyInfo=action.payload
            },
            removeFilter:(state,action)=>{
                state.propertyInfo=action.payload
            }

         
        }
    }
)


export const {setPropertyInfo,applyFilter,removeFilter}=propertySlice.actions;
export default propertySlice.reducer
