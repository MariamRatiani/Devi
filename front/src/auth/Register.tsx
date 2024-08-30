// Register.tsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { myauth } from "./firebaseConfig";

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(myauth, email, password);
            const user = userCredential.user;
            console.log("User registered:", user);
        } catch (error: any) {
            console.error("Error registering user:", error.message);
            setError(error.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
