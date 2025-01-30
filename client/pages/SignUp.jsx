import React, { useRef } from 'react';
import { FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa';
import { auth } from "../config/firebasecon";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router';

const SignUp = () => {
    const userName = useRef();
    const userMail = useRef();
    const userPassword = useRef();
    const navigate = useNavigate();

    function handleCancel() {
        navigate("/");
    }
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
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <span><FaUserCircle />
                    <input type="text" placeholder='Name' required ref={userName} />
                </span>
                <span><FaEnvelope />
                    <input type="text" placeholder='E-mail' required ref={userMail} />
                </span>
                <span><FaLock />
                    <input type="text" placeholder='Password' required ref={userPassword} />
                </span>
                <button onClick={handleEmailSignUp}>Submit</button>
            </form>
            <button onClick={handleCancel}>cancel</button>
        </div>
    )
}

export default SignUp