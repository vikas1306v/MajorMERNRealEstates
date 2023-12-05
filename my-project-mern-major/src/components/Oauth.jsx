import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {GoogleAuthProvider, getAuth, signInWithPopup}  from 'firebase/auth'
import app from '../firebase'
import {createUser} from '../Store/Slices/UserSlice';
import {useAlert} from 'react-alert'

const Oauth = () => {
  const dispatch = useDispatch();
  const alert = useAlert()
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
     
      const provider = new GoogleAuthProvider();
   
      const auth = getAuth(app);
   

      const result = await signInWithPopup(auth, provider);
    

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(createUser(data));
      navigate('/');
      alert.success('Login Successfull')
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <button type="submit" 
    class="w-full text-black bg-red-600 
    hover:bg-primary-700 focus:ring-4 focus:outline-none 
    focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 
    text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" 
   onClick={handleGoogleClick}>Continue With google</button>
  )
}

export default Oauth