import React from 'react';
import {Outlet} from 'react-router';
import NavBar from './NavBar';

const ProtectedNavBar = () => {
  return (
    <>
    <NavBar/>
    <Outlet/>
    </>
  )
}

export default ProtectedNavBar;