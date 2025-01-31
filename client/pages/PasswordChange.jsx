import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { FaEnvelope } from 'react-icons/fa';
import {auth} from '../config/firebasecon';
import {sendPasswordResetEmail} from 'firebase/auth';

const PasswordChange = () => {
    const navigate = useNavigate();
    const userMail = useRef();

    function handleCancel() {
        navigate('/');
    }
    async function  handleSubmit(){
        const mail = userMail.current.value;
        try{
            if(mail)
                await sendPasswordResetEmail(auth,mail,{
                    url: "http://localhost/password-reset",
                    handleCodeInApp: true,
                });
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <div>
            <form onSubmit={e=>e.preventDefault()}>
                <h1>Change Password!!</h1>
                <span>
                    <FaEnvelope />
                    <input type="text" placeholder='E-mail id' required ref={userMail}/>
                </span>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export default PasswordChange