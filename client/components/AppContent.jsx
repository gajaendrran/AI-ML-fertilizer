import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route ,Navigate} from 'react-router-dom';
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from '../pages/SignUp';
import PasswordChange from '../pages/PasswordChange';
import PasswordReset from '../pages/PasswordReset';
import ProtectedNavBar from './ProtectedNavBar';
import History from '../pages/History';
import Statistic from '../pages/Statistic';
import About from '../pages/About';
import NotFoundPage from './NotFoundPage';

const ProtectedRoute = ({ children }) => {
    const globalUser = useSelector((state) => state.userInfo.user);
    return globalUser ? children : <Navigate to="/" />;
};

const AppContent = () => {
    const globalUser = useSelector((state) => state.userInfo.user);
    const [user, setUser] = useState(globalUser);

    useEffect(() => {
        setUser(globalUser);
    }, [globalUser]);

    return (
        <Routes>
            <Route path="/" element={user ? <Navigate to="/home" /> : <SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/password-change" element={<PasswordChange />} />
            <Route path="/password-reset" element={<PasswordReset />} />


            <Route element={<ProtectedNavBar />}>
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
                <Route path="/statistic" element={<ProtectedRoute><Statistic /></ProtectedRoute>} />
                <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            </Route>

            <Route path = "*" element={<NotFoundPage/>}/>

        </Routes>
    );
};

export default AppContent;
