import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        API.get(`/posts/${id}`).then((res) => setPost(res.data));
    }, [id]);

    const handleUpdate = async () => {
        if (!post.title || !post.content) {
            alert("All fields are required");
            return;
        }
        await API.put(`/posts/${id}`, {
            title: post.title,
            content: post.content,
            isPublished: post.isPublished,
        });

        navigate(`/`);
    };

    const deleteComment = async (commentId) => {
        await API.delete(`/comments/${commentId}`);

        setPost((prev) => ({
            ...prev,
            comments: prev.comments.filter((c) => c.id !== commentId),
        }));
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <h2>Edit Post</h2>

            <input
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
            />

            <textarea
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
            />

            <button
                onClick={() =>
                    setPost({ ...post, isPublished: !post.isPublished })
                }
            >
                {post.isPublished ? "Published" : "Draft"}
            </button>

            <h3>Comments</h3>
            {post.comments?.map((c) => (
                <div key={c.id}>
                    <p>{c.content}</p>
                    <button onClick={() => deleteComment(c.id)}>Delete</button>
                </div>
            ))}

            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default EditPost;