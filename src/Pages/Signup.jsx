import { useState } from "react"
import "./page.css"
import { endpoints } from "../services/api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function Signup() {

  const navigate = useNavigate();

   const [formdata ,setFormdata] = useState({
    email:"" ,
    Name:"",
    password:""
   })

   const changeHandler = (e)=>{
    const {name , value} = e.target;

     setFormdata((prev)=>(
      {
        ...prev ,
        [name]: value
      }
     ))
   }

   const submitHandler = async(e)=>{

     const toastId = toast.loading("Loading...");

    e.preventDefault();

    try{
      const response = await fetch(endpoints.SIGNUP_API , {
        method:"POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formdata),
  
      });

      if(response.status === 200){
            toast.success("Successfully register");
            navigate("/login");
           }
           else if(response.status === 400){
            toast.error('user already exist with email');

           }

    } catch(error){
       console.log("error ",error);
       toast.error("Something went wrong , please try again");
    }

    toast.dismiss(toastId);
   }

  return (

     <div className="w-full dark:bg-gray-900 border-t-[1px] border-gray-200 wrap">

  
<form onSubmit={submitHandler} class="max-w-sm mx-auto dark:bg-gray-900 w-full px-4 ">
  <div class="mb-5">
    <label for="Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
    <input type="text" onChange={changeHandler} value={formdata.Name} id="Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="Name" placeholder="Your Name" required />
  </div>

  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" name="email" onChange={changeHandler} value={formdata.email} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="mail@gmail.com" required />
  </div>

  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" name="password" onChange={changeHandler} value={formdata.password} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

</div>
  )
}

export default Signup