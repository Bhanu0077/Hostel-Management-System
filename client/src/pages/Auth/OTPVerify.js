import React, { useState } from "react";
import axios from "axios";

function OTPVerify() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const verifyOTP = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/verify-otp", {
                email,
                otp,
            });
            window.location.href = "/set-password";
        } catch (err) {
            alert("Invalid OTP");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Verify OTP</h2>

            <input
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
            />

            <br /><br />

            <button onClick={verifyOTP}>Verify OTP</button>
        </div>
    );
}

export default OTPVerify;