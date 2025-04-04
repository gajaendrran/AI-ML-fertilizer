import React, { useRef } from 'react';
import { FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa';
import { auth } from "../config/firebasecon";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router';
import {Link} from 'react-router'
import '../pagestyling/SignUp.css';
const SignUp = () => {
    const userName = useRef();
    const userMail = useRef();
    const userPassword = useRef();
    const navigate = useNavigate();

    async function handleEmailSignUp() {
        const mail = userMail.current.value;
        const password = userPassword.current.value;
        try {
            if (mail && password) {
                await createUserWithEmailAndPassword(auth, mail, password);
                navigate("/");
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div className='signup-main'>
            
            <div className='signup-div-1'>
                <h1 className='signup-heading' >Welcome to <span className="signup-typing">Smart-Fert</span></h1>
            </div>

            <div className='signup-div-2'>
                <div className='content-signup'>
                    <h2 className='signup-text'>Sign Up</h2>
                    <form onSubmit={(e) => e.preventDefault()} className='signup-form'>
                        <label htmlFor="signup-name">Name<FaUserCircle /></label>
                        {/* <span><FaUserCircle /></span> */}
                            <input type="text" placeholder='' id='signup-name' required ref={userName} />


                        <label htmlFor="signup-email">Email<FaEnvelope /></label> 
                        {/* <span><FaEnvelope /></span> */}
                            <input type="text" placeholder='' id='signup-name' required ref={userMail} />


                        <label htmlFor="signup-pass">Password<FaLock /></label>
                        {/* <span><FaLock /></span> */}
                            <input type="password" placeholder=''  id='signup-pass' required ref={userPassword} />
                        
                    <button onClick={handleEmailSignUp} className='signup-btn'>Submit</button>

                    <center> <h4 >Account Exists?<span className='signup'><Link to="/"> SignIn</Link></span></h4> </center>
                    </form>
                </div>
            </div>
            
            
        </div>
    )
}
export default SignUp