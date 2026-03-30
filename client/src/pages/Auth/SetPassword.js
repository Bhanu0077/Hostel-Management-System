import React, { useState } from "react";
import axios from "axios";

function SetPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSetPassword = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/set-password", {
                email,
                password,
            });
            alert("Password set successfully!");
            window.location.href = "/";
        } catch (err) {
            alert("Error setting password");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Set Password</h2>

            <input
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleSetPassword}>Set Password</button>
        </div>
    );
}

export default SetPassword;