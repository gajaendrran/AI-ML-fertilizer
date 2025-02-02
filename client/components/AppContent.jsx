import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';  // make sure you're importing from 'react-router-dom'
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from '../pages/SignUp';
import Form from '../pages/Form';  // Make sure to import the Form component here

const AppContent = () => {
    const globalUser = useSelector((state) => state.userInfo.user);
    const [user, setUser] = useState(globalUser);

    useEffect(() => {
        setUser(globalUser);  // Corrected the useState update logic
    }, [globalUser]);

    return (
        <Routes>
            {user ? (
                <>
                    <Route path='/' element={<Home />} />
                    <Route path='/ferti-form' element={<Form />} />
                </>
            ) : (
                <>
                    <Route path='/' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />
                </>
            )}
        </Routes>
    );
};

export default AppContent;
