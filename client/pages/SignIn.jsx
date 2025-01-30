import React, { useEffect, useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import EmailSignIn from './EmailSignIn';
import { auth } from '../config/firebasecon';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setGlobalUser } from '../slices/userSlice';
import { Link } from 'react-router';

const SignIn = () => {

  const [method, setMethod] = useState("load");
  const [error,setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setGlobalUser(user.email));
        setMethod("load");
      } else {
        setMethod(null);
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  async function googleSignIn() {
    try {
      setError(null);
      const googleProvider = new GoogleAuthProvider();
      const credentials = await signInWithPopup(auth, googleProvider);
      dispatch(setGlobalUser(credentials.user.email));
    }
    catch (error) {
      console.error(error);
      setError("Try Again!!");
    }
  }
  return (
    <div>
      {method === "load" && <div><span>Loading...</span></div>}
      {!method && (
        <div>
          <h1>Welcome to Smart-Fert</h1>
          <h2>Sign In to continue..</h2>
          <EmailSignIn />
          <span>or</span>
          <button onClick={googleSignIn}>Google<FaGoogle /></button>
          <span><Link to="/signup">Signup</Link></span>
          {error && <span>{error}</span>}
        </div>
      )}
    </div>
  )
}

export default SignIn