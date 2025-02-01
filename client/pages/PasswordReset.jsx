import React, { useEffect, useRef, useState } from 'react';
import {confirmPasswordReset} from 'firebase/auth';
import {auth} from '../config/firebasecon';
import {useNavigate} from 'react-router';
import '../pagestyling/PasswordReset.css';

const PasswordReset = () => {

    const [error,setError] = useState();
    const userPassword = useRef();
    const navigate = useNavigate();

    const query =  new URLSearchParams(window.location.search);

    useEffect(()=>{
        if(!query.get('oobCode'))
        {
            navigate('/');
        }
    },[]);

    async function handleReset()
    {
        const password = userPassword.current.value;
        try{
            if(password)
            {
                await confirmPasswordReset(auth,query.get('oobCode'),password);
                navigate('/');
            }
        }
        catch(error){
            if (error.code === 'auth/expired-action-code') {
                setError('reset link has expired,Request a new one!');
            } else if (error.code === 'auth/invalid-action-code') {
                setError('Invalid Link,Try Again!');
            } else {
                setError('Please try again.');
            }
            setTimeout(() => navigate('/'), 2000);
        }
    }
  return (
    <div className='signup-main'>
        <div className='signup-div-1'>
            <h1 className='heading' >Welcome to <span className="typing">Smart-Fert</span></h1>
        </div>

        
        <div className='signup-div-2'>
            <div className='content-signup'>
                <h1 className='signup-text'>Enter the new password</h1>
                <form onSubmit={e=>e.preventDefault()} className='signup-form'>
                    <label htmlFor="passreset">New Password</label>
                    <input type="password" placeholder='Password' id='passreset' required ref={userPassword} />
                    {error && <span>{error}</span>}
                    <button onClick={handleReset} className='signup-btn'>Reset</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PasswordReset