import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import { Register } from './Register.jsx';
import { Home } from './Home.jsx';
import '../App.css'
import { ProtectedRoute } from './ProtectedRoute.jsx';

function App() {
  const navigate = useNavigate()
  const isLoggedInVar = localStorage.getItem('isLoggedIn')

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
        <Route path='*' element={
          // isLoggedInVar ? <Home navigate={navigate} /> : <Navigate to="/login" />
          isLoggedInVar ? <Navigate to="/home" /> : <Navigate to="/login" />

        } />
      </Routes>
    </>
  )
}

export default App
