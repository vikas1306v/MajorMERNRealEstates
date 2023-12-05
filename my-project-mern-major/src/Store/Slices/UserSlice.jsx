import {createSlice}  from "@reduxjs/toolkit";
const initialState={
    userName:"",
    email:'',
    avatar:'',
    id:'',
    accessToken:"" 
}
const userSlice=createSlice(
    {
        name:"user",
        initialState,
        reducers:{

            createUser:(state,action)=>{
                state.userName=action.payload.user.name;
                state.email=action.payload.user.email;
                state.avatar=action.payload.user.avatar;
                state.id=action.payload.user._id;
                state.accessToken=action.payload.access_token;                
            },
            deleteUser:(state,action)=>{
                state.userName="";
                state.email='';
                state.avatar='';
                state.id='';
                state.accessToken="";
            },
            loginUser:(state,action)=>{
                state.userName=action.payload.user.name;
                state.email=action.payload.user.email;
                state.avatar=action.payload.user.avatar;
                state.id=action.payload.user._id;
                state.accessToken=action.payload.access_token;
            },
            updateUser(state,action){

            },

            logout:(state,action)=>{
                state.userName="";
                state.email='';
                state.avatar='';
                state.id='';
                state.accessToken=""; 
            }

        }
    }
)


export const {createUser,logout,deleteUser,loginUser}=userSlice.actions;
export default userSlice.reducer
