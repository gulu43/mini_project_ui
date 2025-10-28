import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import { Register } from './Register.jsx';
import { Home } from './Home.jsx';
import '../App.css'

function App() {
  const navigate = useNavigate()

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login navigate={navigate} />} />
        <Route path='/register' element={<Register navigate={navigate} />} />
        <Route path='/home' element={<Home />} />
        <Route path='*' element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App
