import React, { useRef, useState } from 'react';
import { FaUserCircle, FaEnvelope, FaLock } from 'react-icons/fa';
import { auth } from '../config/firebasecon';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setGlobalUser } from '../slices/userSlice';
import { Link } from 'react-router';
import '../pagestyling/EmailSignIn.css';

const EmailSignIn = () => {
  const dispatch = useDispatch();
  const userMail = useRef();
  const userPassword = useRef();
  const [error, setError] = useState();

  async function handleEmailSignIn() {
    setError(null);
    const mail = userMail.current.value;
    const password = userPassword.current.value;
    try {
      if (mail && password) {
        const credentials = await signInWithEmailAndPassword(auth, mail, password);
        const token = await credentials.user.getIdToken();
        const userDetail = {
                email : credentials.user.email,
                token: token
              }
        dispatch(setGlobalUser(userDetail));
      }
    }
    catch (err) {
      console.error(err);
      setError("Invalid Details,Try Again!!");
    }
  }
  return (
    <form onSubmit={(e) => e.preventDefault()} className='form'>

      { <label htmlFor="emailinput"> E-mail<FaEnvelope /></label>}
{/*       <span className="icon"><FaEnvelope /> </span>
 */}      <input type="text" placeholder='' required ref={userMail} id='emailinput' />

      <label htmlFor="passinput">Password<FaLock /></label>      
{/*       <span> </span>
 */}      <input type="password" placeholder='' required ref={userPassword} id='passinput' />

      <Link to='/password-change' className='forget-pass'>Forget Password?</Link>
      {error && <span>{error}</span>}

      <button onClick={handleEmailSignIn} className='submit'>Submit</button>

    </form>
  )
}

export default EmailSignIn;