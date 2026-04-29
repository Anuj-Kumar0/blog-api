import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      const res = await API.post("/auth/register", {
        email,
        password,
        username,
      });

      if (res.status === 201) {
        navigate(`/login`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header />
      <h2>Register</h2>
      <button onClick={() => navigate(`/`)}>Home</button>
      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegistration}>Register</button>
      <p>
        Already has an account?{" "}
        <span onClick={() => navigate(`/login`)}>
          <strong>Login Here!</strong>
        </span>
      </p>
    </div>
  );
};

export default Registration;
