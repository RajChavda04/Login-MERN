import {Navigate, Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login'
import { useState } from 'react';
import Register from './Pages/Register'
import RefrshHandler from './RefreshHandler';
import Home from "./Pages/Home"
// import { ToastContainer } from 'react-toastify';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute=({element})=>{
    return isAuthenticated ? element:<Navigate to="/login"></Navigate>
  }
  return (
    <>
    <RefrshHandler setIsAuthenticated={setIsAuthenticated}></RefrshHandler>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}></Route>
    <Route path="/login" element={<Login></Login>}></Route>
    <Route path="/register" element={<Register></Register>}></Route>
    <Route path="/home" element={<PrivateRoute element={<Home></Home>} />}></Route>

    </Routes>
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
