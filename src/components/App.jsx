import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import { InvalidRouts } from './InvalidRouts.jsx';
import { Register } from './Register.jsx';
import { Home } from './Home.jsx';
import UpdatePassword from './UpdatePassword.jsx';
import '../App.css'
import { ProtectedRoute } from './ProtectedRoute.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function App() {

  const navigate = useNavigate()
  const isLoggedInVar = localStorage.getItem('isLoggedIn') === 'true'

  useEffect(() => {
    if (window.location.pathname === "/") {
      if (isLoggedInVar) {
        navigate("/home", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path='/login' element={
          // isLoggedInVar ? <Home navigate={navigate} /> : <Login navigate={navigate} />
          isLoggedInVar ? <Navigate to="/home" /> : <Login />

        } />
        <Route path='/register' element={
          // isLoggedInVar ? <Home navigate={navigate} /> : <Register navigate={navigate} />
          isLoggedInVar ? <Navigate to="/home" /> : <Register />

        } />

        <Route path='/home' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path='/resetpassword' element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        } />



        {/* // isLoggedInVar ? <Navigate to="/home" /> : <Navigate to="/login" /> */}
        <Route path='*' element={<InvalidRouts />} />

      </Routes>
      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />    </>
  )
}

export default App
