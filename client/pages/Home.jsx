import React from 'react';
import { Link } from 'react-router-dom';
import { removeGlobaluser } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebasecon';

const Home = () => {
  const dispatch = useDispatch();
  async function logOut() {
    await signOut(auth);
    dispatch(removeGlobaluser());
  }
  return (
    <div>
      <h1>Welcome</h1>

        <Link to="./ferti-form"> Use SmartFert AI </Link>
      <button onClick={logOut}>Log out</button>
    </div>
  )
}

export default Home