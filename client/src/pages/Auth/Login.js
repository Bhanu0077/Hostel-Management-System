import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");

    const sendOTP = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/send-otp", {
                email,
            });
            alert("OTP sent! Check backend terminal");
        } catch (err) {
            alert("Error sending OTP");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Login</h2>

            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <button onClick={sendOTP}>Send OTP</button>
        </div>
    );
}

export default Login;