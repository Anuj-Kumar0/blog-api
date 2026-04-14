import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const res = await API.get("/posts");
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
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
            <h1>Dashboard</h1>

            <a href="/new">NEW POST</a>

            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.isPublished ? "Published" : "Draft"}</p>

                    <button onClick={() => togglePublish(post)}>
                        Toggle Publish
                    </button>

                    <button onClick={() => deletePost(post.id)}>
                        Delete
                    </button>

                    <a href={`/edit/${post.id}`}>Edit</a>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;