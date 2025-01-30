import React, { useRef, useState } from 'react';
import { FaUserCircle, FaEnvelope, FaLock } from 'react-icons/fa';
import { auth } from '../config/firebasecon';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setGlobalUser } from '../slices/userSlice';


const EmailSignIn = () => {
  const dispatch = useDispatch();
  const userMail = useRef();
  const userPassword = useRef();
  const [error,setError] = useState();

  async function handleEmailSignIn() {
    setError(null);
    const mail = userMail.current.value;
    const password = userPassword.current.value;
    try {
      if (mail && password) {
        const credentials = await signInWithEmailAndPassword(auth, mail, password);
        dispatch(setGlobalUser(credentials.user.email));
      }
    }
    catch (err) {
      console.error(err);
      setError("Invalid Details,Try Again!!");
    }
  }
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <span><FaEnvelope />
        <input type="text" placeholder='E-mail' required ref={userMail} />
      </span>
      <span><FaLock />
        <input type="text" placeholder='Password' required ref={userPassword} />
      </span>
      <button onClick={handleEmailSignIn}>Submit</button>
      {error && <span>{error}</span>}
    </form>
  )
}

export default EmailSignIn;