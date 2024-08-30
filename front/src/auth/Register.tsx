import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { myauth } from "./firebaseConfig";

// Define the prop type for the close function
interface RegisterProps {
    close: () => void;
}

const Register: React.FC<RegisterProps> = ({ close }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(myauth, email, password);
            const user = userCredential.user;
            console.log("User registered:", user);
            close(); // Close the form after successful registration
        } catch (error: any) {
            console.error("Error registering user:", error.message);
            setError(error.message);
        }
    };

    return (
        <div className="auth-container login-register-container">
            <button id="close-auth-button" onClick={close}>X</button> {/* Add close button */}
            <h2>რეგისტრაცია</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleRegister}>
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
                <button className="final-auth-button" type="submit">რეგისტრაცია</button>
            </form>
        </div>
    );
};

export default Register;
