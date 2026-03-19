import { useState } from 'react'
import Navbar from './components/common/Navbar'
import Login from './features/auth/pages/Login'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
    <Login/>
    <ToastContainer position='bottom-right'/>
    </>
  )
}

export default App
