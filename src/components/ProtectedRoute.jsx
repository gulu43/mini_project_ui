import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />
    }

    return children
}

// import { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";

// export function ProtectedRoute({ passedComponent }) {

//     const isLoggedInVar = localStorage.getItem('isLoggedIn')
//     if (!isLoggedInVar) {
//         console.log('isLoggedInVar is false or undefine: ', isLoggedInVar)
//         return <Navigate to="/login" replace />;
//     }

//     return passedComponent
// }
