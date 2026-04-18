import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPost = async () => {
        try {
            const res = await API.get(`/posts/${id}`);
            setPost(res.data);
        } catch (err) {
            console.error(err);
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!post) return <p>Post not found</p>;

    return (
        <div style={{ padding: "20px" }}>

            <h1>{post.title}</h1>

            <p style={{ color: "gray" }}>
                {post.isPublished ? "Published" : "Draft"}
            </p>

            <hr />

            <p style={{ lineHeight: "1.6" }}>{post.content}</p>

            <hr />

            <h3>Comments</h3>

            {post.comments?.length > 0 ? (
                post.comments.map((c) => (
                    <div key={c.id} style={{ marginBottom: "10px" }}>
                        <p>{c.content}</p>
                        <small>
                            by {c.user?.username} ({c.user?.role})
                        </small>
                    </div>
                ))
            ) : (
                <p>No comments yet</p>
            )}
        </div>
    );
};

export default Post;