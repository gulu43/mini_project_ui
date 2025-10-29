import React from 'react';
import { Link } from 'react-router-dom';

import '../App.css'
export function InvalidRouts() {
    return (
        <>
            <div className='not_Found_Div'>
                <span>404</span>
                <b><p>The page you are looking for doesn't exist.</p></b>
                <Link className='link' to="/login">Go to login or home</Link>
            </div>
        </>
    );
}