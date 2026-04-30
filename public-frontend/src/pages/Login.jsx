import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      const token = res?.data?.token;

      if (!token) {
        throw new Error("Token not received");
      }

      localStorage.setItem("token", token);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-box page">
      <Header />
      <h2>Login</h2>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{" "}
        <span onClick={() => navigate(`/register`)}>
          <strong>Register Here!</strong>
        </span>
      </p>
    </div>
  );
};

export default Login;
