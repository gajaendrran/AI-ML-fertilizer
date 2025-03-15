import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { FaEnvelope } from 'react-icons/fa';
import {auth} from '../config/firebasecon';
import {sendPasswordResetEmail} from 'firebase/auth';
import '../pagestyling/PasswordChange.css';

const PasswordChange = () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
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
                    url: `${serverUrl}/password-reset`,
                    handleCodeInApp: true,
                });
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <div className='signup-main'> 
          <div className='signup-div-1'>
            <h1 className='heading' >Welcome to <span className="typing">Smart-Fert</span></h1>
          </div>

          <div className='signup-div-2'>
            <div className='content-signup'>
                <h1 className='signup-text'>Change Password!!</h1>

                <form onSubmit={e=>e.preventDefault()} className='signup-form'>
                    
                    {/* <span><FaEnvelope /></span> */}
                        <label htmlFor="passchange-email">E-mail<FaEnvelope /></label>
                        <input type="text" placeholder='' id='passchange-email' required ref={userMail}/>
                    
                    <button onClick={handleSubmit} className='signup-btn'>Submit</button>
                    <button onClick={handleCancel} className='signup-btn'>Cancel</button>
                </form>
            </div>
          </div>
            
        
            
        </div>
    )
}

export default PasswordChange