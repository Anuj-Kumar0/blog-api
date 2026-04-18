import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { isLoggedIn } from "../services/auth";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    const fetchPosts = async () => {
        const res = await API.get("/posts/admin");
        setPosts(res.data);
    };
    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login");
        } else {
            fetchPosts();
        }
    }, []);

    const togglePublish = async (post) => {
        await API.put(`/posts/${post.id}`, {
            ...post,
            isPublished: !post.isPublished,
        });
        fetchPosts();
    };

    const deletePost = async (id) => {
        await API.delete(`/posts/${id}`);
        fetchPosts();
    };

    return (
        <div>

            <h3><LogoutButton /></h3>

            {isLoggedIn() && (
                <>
                    <h1>Dashboard</h1>

                    <button onClick={() => navigate("/new")}>
                        NEW POST
                    </button>
                </>
            )}

            {posts.map((post) => (
                <div
                    key={post.id}
                    onClick={() => navigate(`/post/${post.id}`)}
                    style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
                >
                    <h3>{post.title}</h3>
                    <p>{post.isPublished ? "Published" : "Draft"}</p>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            togglePublish(post);
                        }}
                    >
                        Toggle Publish
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deletePost(post.id);
                        }}
                    >
                        Delete
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/edit/${post.id}`);
                        }}
                    >
                        Edit
                    </button>
                </div>
            ))}
        </div >
    );
};

export default Dashboard;