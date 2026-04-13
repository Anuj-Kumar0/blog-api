import { useEffect, useState } from "react";
import API from "../services/api";

const Home = () => {
    const [posts, setPosts] = useState([]);

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

            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;