import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import { Routes, Route } from 'react-router';
import SignUp from '../pages/SignUp';
import PasswordChange from '../pages/PasswordChange';
import PasswordReset from '../pages/PasswordReset';

const AppContent = () => {
    const globalUser = useSelector((state) => state.userInfo.user);
    const [user, setUser] = useState(globalUser);

    useEffect(() => {
        setUser((user) => globalUser);
    }, [globalUser]);

    return (
        <Routes>
            {
                user ? <Route path='/' element={<Home />} /> :
                    <>
                        <Route path='/' element={<SignIn />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/password-change' element={<PasswordChange/>}/>
                        <Route path='/password-reset' element={<PasswordReset/>}/>
                    </>
            }
        </Routes>

    )
}

export default AppContent