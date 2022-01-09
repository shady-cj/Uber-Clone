import React, { useEffect } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
            }
        });
    }, []);
    return (
        <div className="Login-wrapper">
            <img
                className="login-uberlogo"
                src="https://i.ibb.co/n6LWQM4/Post.png"
                alt=""
            />
            <img
                className="login-mainImage"
                src="https://i.ibb.co/CsV9RYZ/login-image.png
"
                alt=""
            />
            <div className="login-title">Login in to access your account</div>
            <button
                className="signin-btn"
                onClick={() => signInWithPopup(auth, provider)}
            >
                Sign in with Google
            </button>
        </div>
    );
};

export default Login;
