// Authentication.tsx
import React, { useEffect, useState } from "react";
import {
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    User
} from "firebase/auth";
import { myauth } from "./firebaseConfig";
import Register from "./Register";
import Login from "./Login";
import {useNavigate} from "react-router-dom";

const Authentication: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [showRegister, setShowRegister] = useState<boolean>(false);
    const [showLogin, setShowLogin] = useState<boolean>(false);

    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    
    const showRegistration = () => {
        setShowRegister(true);
        setShowLogin(false);
    };

    const showLoginComponent = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(myauth, (user) => {
            if (user) {
                setUser(user);
                console.log("User signed in:", user);
                navigate("/game");
            } else {
                setUser(null);
                console.log("No user signed in");
            }
        });

        return () => unsubscribe(); // Cleanup the observer on unmount
    }, [navigate]);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(myauth, googleProvider);
            // This gives you a Google Access Token. You can use it to access Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("Google Sign-In user:", user, "Token:", token);
        } catch (error: any) {
            // Handle Errors here.
            console.error("Error during Google Sign-In:", error.message);
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData?.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error("Google Sign-In error details:", {
                errorCode,
                errorMessage,
                email,
                credential,
            });
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(myauth);
            console.log("User signed out");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="auth-container-parent">
            {user ? (
                <div className="auth-container">
                    <h2>Welcome, {user.email}</h2>
                    <button className="auth-button" onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
                <div className="auth-container">
                    <div className="toggle-buttons">
                        <button className="toggle-button" onClick={showRegistration}>Register</button>
                        <button className="toggle-button" onClick={showLoginComponent}>Login</button>
                        <button className="toggle-button google-signin" onClick={handleGoogleSignIn}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                width="20px"
                                height="20px"
                                style={{marginRight: '10px'}}
                            >
                                <path fill="#4285F4"
                                      d="M24 9.5c3.9 0 6.8 1.7 8.4 3.2l6.2-6.2C34.5 3.6 29.6 1.5 24 1.5 14.6 1.5 6.6 7.9 3.4 16l7.6 5.8C12.7 14.7 18 9.5 24 9.5z"></path>
                                <path fill="#34A853"
                                      d="M46.5 24c0-1.6-.1-3.2-.4-4.8H24v9.1h12.6c-.5 2.6-1.9 4.9-3.9 6.4l6.2 4.8c3.6-3.4 5.6-8.4 5.6-14.1z"></path>
                                <path fill="#FBBC05"
                                      d="M10.4 28.2c-.5-1.6-.8-3.3-.8-5.2s.3-3.5.8-5.2L2.9 11C1.1 14.1 0 18.2 0 22.8c0 4.6 1.1 8.7 2.9 11.8l7.5-5.8z"></path>
                                <path fill="#EA4335"
                                      d="M24 47.3c5.7 0 10.5-1.9 14-5.2l-6.7-5.2c-1.8 1.4-4.2 2.3-7.3 2.3-5.5 0-10.2-3.7-11.9-8.7l-7.6 5.8C6.5 41.6 14.2 47.3 24 47.3z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                    {showRegister && <Register/>}
                    {showLogin && <Login/>}
                </div>
            )}
        </div>
    );
};

export default Authentication;
