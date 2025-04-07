import React, { useEffect, useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import EmailSignIn from './EmailSignIn';
import { auth } from '../config/firebasecon';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setGlobalUser } from '../slices/userSlice';
import { Link } from 'react-router';
import '../pagestyling/SignIn.css';
const SignIn = () => {

  const [method, setMethod] = useState("load");
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        const token = await user.getIdToken();
        const userDetail = {
          email: user.email,
          token: token
        }
        dispatch(setGlobalUser(userDetail));
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
      const token = await credentials.user.getIdToken();
      const userDetail = {
        email: credentials.user.email,
        token: token
      }
      dispatch(setGlobalUser(userDetail));
    }
    catch (error) {
      console.error(error);
      setError("Try Again!!");
    }
  }
  return (
    <div>
      {method === "load" &&
        <div className="parent-loading">
          <div className="loadingspinner">
            <div id="square1"></div>
            <div id="square2"></div>
            <div id="square3"></div>
            <div id="square4"></div>
            <div id="square5"></div>
          </div>
        </div>}
      {!method && (
        <div className='main'>
          <div className='div-1'>
            <h1 className='heading' >Welcome to <span className="typing">Smart-Fert</span></h1>
          </div>
          <div className='div-2'>
            <div className='signin'>
              <h2 className='signin-text'>Sign In </h2>
              <EmailSignIn />

              <div className='or-con'>
                <span>or</span>
              </div>

              <div className='google-continue'>
                <button onClick={googleSignIn} className='btn-google'>Continue with Google<FaGoogle /></button>
              </div>

              <center> <h4 >New Here? <span className='signup'><Link to="/signup">Signup</Link></span></h4> </center>

              {error && <span>{error}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignIn