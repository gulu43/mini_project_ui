import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home.css'
import { toast } from 'react-toastify';

export function Home() {
    const navigate = useNavigate()
    function logOutFn() {
        localStorage.removeItem('isLoggedIn')
        // localStorage.clear()
        navigate('/login')
    }
    return (
        <>
            <h1>home component</h1>
            
            <span className='logout_lable' onClick={logOutFn}>log-Out</span>
        </>
    );
}