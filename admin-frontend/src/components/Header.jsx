import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="brand" onClick={() => navigate("/")}>
        ThoughtTrail
      </div>
    </header>
  );
};

export default Header;
