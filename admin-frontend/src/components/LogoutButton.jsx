import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../services/auth";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <>
            {isLoggedIn() ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={handleLogin}>Login to See All Posts</button>
            )}
        </>
    );
};

export default LogoutButton;