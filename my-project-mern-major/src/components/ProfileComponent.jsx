import React ,{useState}from 'react'
import { useDispatch } from 'react-redux';
import { Link,useNavigate  } from 'react-router-dom'
import AddHomeModal from './AddHomeModal'
import DeleteAccountModal from './DeleteAccountModal'
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import {logout,deleteUser} from '../Store/Slices/UserSlice'


const ProfileComponent = () => {
  const [openModal,setOpenModal]=useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const alert = useAlert()
  const navigate = useNavigate();

  const data=useSelector((state)=>{
    return state.users
  })
 
  
  const handlelogout=()=>{

    dispatch(logout())
    navigate('/')
    alert.success('Successfully logged out')
  }

 
  return (
    <>

  <div  className='flex justify-center'>
  <div  style={{marginTop:'35px'}}>

  <div class="p-16">
<div class="p-8 bg-white shadow mt-24">
  <div class="grid grid-cols-1 md:grid-cols-3">
  
    <div class="relative">
      <div class="w-48 h-48  bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24  text-indigo-500"
      style={{backgroundImage:`url(${data.avatar})`,backgroundRepeat:'no-repeat',backgroundSize:'100%'}}>
       

      </div>
    </div>

    <div class="space-x-6 flex justify-between mt-32 md:mt-0 md:justify-center">
<button
  class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
>
 <Link to='/wishlist'>Your WishList</Link>
</button>
    <button 
  class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
>
<Link to='/addlisting'>Add your property</Link>
</button>
    <button onClick={() => setIsOpen(true)}
  class="text-white py-2 px-4 uppercase rounded bg-red-700 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
>
  Delete Account
</button>
    <button onClick={handlelogout}
  class="text-white py-2 px-4 uppercase rounded bg-green-600 hover:bg-green-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
>
  Logout
</button>
    </div>
  </div>

  <div class="mt-20 text-center  ">
    <h1 class="text-4xl font-medium text-gray-700">{data.userName}</h1>
    <p class="font-light text-gray-600 mt-3">{data.email}</p>

 
    
  </div>


</div>
</div>
    </div>
</div>

<AddHomeModal openModal={openModal} setOpenModal={setOpenModal}/>
<DeleteAccountModal isOpen={isOpen} setIsOpen={setIsOpen} />














    </>
  )
}

export default ProfileComponent