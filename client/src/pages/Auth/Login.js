import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post("/auth/login", {
                email,
                password
            });

            // ✅ store token
            localStorage.setItem("token", res.data.token);

            alert("Login successful 🚀");

            navigate("/dashboard");

        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <div style={{ padding: "50px" }}>
            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            /><br /><br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            /><br /><br />

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;