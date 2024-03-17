import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setToken } from '../reducer/slices/authSlice';

function Navbar() {

     const navigate = useNavigate();

     const {token} = useSelector((state)=>state.auth);
     const dispatch = useDispatch();

  return (
   

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href='/' class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Dobby Ads</span>
    </a>
  

    <div class="  block w-auto" id="navbar-default">
      <ul class="font-medium flex rounded-lg  flex-row md:space-x-8 rtl:space-x-reverse  md:bg-white  dark:bg-gray-900 dark:border-gray-700">
       
        {
          !token ?
          <>
          <button onClick={()=>navigate("/signup")} class="block py-2 px-3 text-white  rounded md:bg-transparent  md:p-0 dark:text-white hover:text-blue-700 transition-all duration-200">Signup</button>
          <button onClick={()=>navigate("/login")}  class="block py-2 px-3 text-white  rounded md:bg-transparent  md:p-0 dark:text-white hover:text-blue-700 transition-all duration-200 ">Login</button>
          </>
          :
          <>
          <button onClick={()=>navigate("/dashboard")}  class="block py-2 px-3 text-white  rounded md:bg-transparent  md:p-0 dark:text-white hover:text-blue-700 transition-all duration-200 ">Dashboad</button>
          <button  onClick={()=>{
            navigate("/");
             localStorage.removeItem("dobby_token");
              dispatch(setToken(null));
          }}  class="block py-2 px-3 text-white  rounded md:bg-transparent  md:p-0 dark:text-white hover:text-blue-700 transition-all duration-200 ">Logout</button>
          </>
        }
          </ul>
    </div>
  </div>
</nav>

  )
}

export default Navbar