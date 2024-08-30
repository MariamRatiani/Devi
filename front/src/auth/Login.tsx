import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { myauth } from "./firebaseConfig";

// Define the prop type for the close function
interface LoginProps {
    close: () => void;
}

const Login: React.FC<LoginProps> = ({ close }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(myauth, email, password);
            const user = userCredential.user;
            console.log("User logged in:", user);
            close(); // Close the form after successful login
        } catch (error: any) {
            console.error("Error logging in:", error.message);
            setError(error.message);
        }
    };

    return (
        <div className="auth-container login-register-container">
            <button id="close-auth-button" onClick={close}>X</button> {/* Add close button */}
            <h2>შესვლა</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="მეილი"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="პაროლი"
                    required
                />
                <button  className="final-auth-button" type="submit">შესვლა</button>
            </form>
        </div>
    );
};

export default Login;
