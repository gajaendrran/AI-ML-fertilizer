import React, { useEffect, useRef, useState } from 'react';
import {confirmPasswordReset} from 'firebase/auth';
import {auth} from '../config/firebasecon';
import {useNavigate} from 'react-router';

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
    <div>
        <form onSubmit={e=>e.preventDefault()}>
            <h1>Enter the new password</h1>
            <input type="password" placeholder='Password'required ref={userPassword} />
            {error && <span>{error}</span>}
            <button onClick={handleReset}>reset</button>
        </form>
    </div>
  )
}

export default PasswordReset