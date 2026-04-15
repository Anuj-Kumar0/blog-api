import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";


const Home = () => {
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await API.get("/posts");
                console.log("API response:", res.data)
                setPosts(res.data);
            } catch (err) {
                console.error("API error:", err);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Blogs</h1>

            <h3><LogoutButton /></h3>

            {posts.map((post) => (
                <div
                    key={post.id}
                    onClick={() => navigate(`/post/${post.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;