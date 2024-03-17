import { useEffect, useRef, useState } from "react";
import "./page.css";
import toast from "react-hot-toast";
import { endpoints } from "../services/api";
import { useSelector } from "react-redux";

function Dashboard() {
  const [formdata, setFormdata] = useState({
    Name: "",
    image: null,
  });

  const fileInputRef = useRef(null);

  const [loading , setLoading] = useState(false);

  const [serchInput , setSearchInput] = useState("");

  const [allImages, setAllImages] = useState([]);

  const [filterImage , setFilterImage] = useState([]);

  const { token } = useSelector((state) => state.auth);

  const changeHandler = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormdata((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormdata((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitHandler = async (e) => {
    const toastId = toast.loading("loading...");
    try {
      e.preventDefault();

      const formDataToSend = new FormData();
      formDataToSend.append("Name", formdata.Name);
      formDataToSend.append("image", formdata.image); // Append the file to FormData

      const response = await fetch(endpoints.IMAGE_UPLOAD, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.status === 200) {
        toast.success("Successfuly uploaded Image");
        getAllImage();
        fileInputRef.current.value = ""; 
        setFormdata({
          Name: "",
          image: null,
        })
      } else {
        toast.error("Something went wrong , please try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ");
    }
    toast.dismiss(toastId);

    
  };

  const getAllImage = async () => {
    setLoading(true);
    try {
      const response = await fetch(endpoints.GET_IMAGE, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const formattedResponse = await response.json();

      if (response.status === 200) {
        setAllImages(formattedResponse?.user);
        setFilterImage(formattedResponse?.user);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };


  useEffect(()=>{

      if(serchInput !== ""){

         const dummyImg = [...allImages];

        const filteredImages = dummyImg.filter((image) =>
        image.Name.toLowerCase().includes(serchInput.toLowerCase())
      );

       setFilterImage([...filteredImages]);

      }
      else {
        setFilterImage([...allImages]);
      }
 
  },[serchInput])

  useEffect(() => {
    getAllImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="w-full dark:bg-gray-900 border-t-[1px] border-gray-200 dash">
      {/* upload image  */}
      <form onSubmit={submitHandler}>
        <div class="mb-5">
          <label
            for="Name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Image Name
          </label>
          <input
            type="text"
            onChange={changeHandler}
            value={formdata.Name}
            id="Name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="Name"
            placeholder="Image Name"
            required
          />
        </div>

        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
        >
          Upload file
        </label>
        <input
          required
          ref={fileInputRef}
          name="image"
          onChange={changeHandler}
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
        />

        <button
          type="submit"
          class=" mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

      <h2 className="text-white font-[600] text-[24px] md:text-[32px]">All Uploaded Images</h2>

{/* search bar  */}

<form class="max-w-[500px]">   
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input onChange={(e)=>{
            setSearchInput(e.target.value);
            
        }} value={serchInput} type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Images..." required />
      
    </div>
</form>


 {
  loading ?
  
  <span class="loader"></span>
 :

  filterImage.length > 0 ?

      <div className="allBoxes">
        {/* single box  */}
      
        {filterImage?.map((image) => (
          <div
            key={image?._id}
            class=" bg-white border max-w-[200px] w-full h-[200px] border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="">
              <img class="rounded-t-lg h-[150px] max-w-[200px] w-full " src={image.image} alt="" />
            </a> 
            <div class="p-5">
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {image?.Name}
              </p>
            </div>
          </div>
        ))}
      </div>
      :
      <div className="noImage">

            <h1>No Image Found </h1>

      </div>

        }
    </div>
  );
}

export default Dashboard;
