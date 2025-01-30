import React from 'react';
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
      <button onClick={logOut}>Log out</button>
    </div>
  )
}

export default Home