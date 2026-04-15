import { useState } from "react";
import API from "../services/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;