import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import Dashboard from "./Pages/Dashboard"
import Home from "./Pages/Home"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import { useSelector } from 'react-redux';
import OpenRoute from './Component/OpenRoute';

function App() {

   const {token} = useSelector((state)=>state.auth);
   console.log("tpken",token);

  return (
     <div className="App">

      <Navbar />

      <Routes>

 {
  token ?
  <>
  <Route path='/dashboard' element={<Dashboard />}  />
<Route path='/' element={<Home />}  />
  <Route path='*' element={<OpenRoute dashboard={true} />}  />
  </>
  :
  <>
      <Route path="/login" element={<Login />}  />
      <Route path="/Signup" element={<Signup />}  />      
<Route path='/' element={<Home />}  />
  <Route path='*' element={<OpenRoute home={true} />}  />
  </>
 }
      </Routes>

     </div>
  );
}

export default App;
