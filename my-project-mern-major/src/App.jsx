import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home'
import About from './pages/About'
import './App.css'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Houses from './pages/Houses';
import Login from './components/Login';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Profile'
import Footer from './components/Footer';
import WishListPage from './pages/WishListPage';
import Contact from './pages/Contact';
import PrivateRoute from './Protection/Sercure';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import CreateListing from './components/CreateListing';

function App() {
  
  return (  
    <>
     <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about'element={<About />}></Route>
        <Route path='/signup'element={<SignUp />}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/resetpassword/:id/:token' element={<ResetPassword/>}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
       
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/houses' element={<Houses/>}></Route>
            <Route path='/wishlist' element={<WishListPage/>}></Route>
            <Route path='/addlisting' element={<CreateListing/>}></Route>
        </Route>    
        <Route path='/*' element={<ErrorPage/>}></Route>
      </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
