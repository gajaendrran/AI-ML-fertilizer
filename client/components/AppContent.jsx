import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from '../pages/SignUp';
import PasswordChange from '../pages/PasswordChange';
import PasswordReset from '../pages/PasswordReset';
import ProtectedNavBar from './ProtectedNavBar';
import History from '../pages/History';
import Contact from '../pages/Contact';
import About from '../pages/About';

const AppContent = () => {
    const globalUser = useSelector((state) => state.userInfo.user);
    const [user, setUser] = useState(globalUser);

    useEffect(() => {
        setUser(globalUser);
    }, [globalUser]);

    return (
        <Routes>
            {user ? (
                <>
                    <Route element={<ProtectedNavBar />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/history' element={<History />} />
                        <Route path='/notify' element={<Contact />} />
                        <Route path='/about' element={<About />} />
                    </Route>
                </>
            ) : (
                <>
                    <Route path='/' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/password-change' element={<PasswordChange />} />
                    <Route path='/password-reset' element={<PasswordReset />} />
                </>
            )}
        </Routes>
    );
};

export default AppContent;
