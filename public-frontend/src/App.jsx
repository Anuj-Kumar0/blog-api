import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;