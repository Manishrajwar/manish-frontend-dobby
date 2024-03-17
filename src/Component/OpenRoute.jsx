import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function OpenRoute({dashboard=false , home=false}) {
    const navigate = useNavigate();
 useEffect(()=>{
     if(dashboard){
          navigate("/dashboard");
     }
     else if(home){
          navigate("/");
     }
 },[])
}

export default OpenRoute