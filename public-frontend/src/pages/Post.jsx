import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { isLoggedIn, getToken } from "../services/auth";
import LogoutButton from "../components/LogoutButton";
import { useNavigate } from "react-router-dom";

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [comment, setComment] = useState("");

    const navigate = useNavigate();

    const fetchPost = () => {
        API.get(`/posts/${id}`).then((res) => {
            setPost(res.data);
        });
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    const handleAddComment = async () => {
        if (!comment.trim()) return;

        try {
            await API.post(
                `/posts/${id}/comments`,
                { content: comment },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );

            setComment("");
            setShowInput(false);
            fetchPost();
        } catch (err) {
            console.error(err);
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div>

            <h3><LogoutButton /></h3>

            <h1>{post.title}</h1>
            <p>{post.content}</p>

            <h3>Comments</h3>
            {post.comments?.map((c) => (
                <p key={c.id}>{c.content}</p>
            ))}

            {isLoggedIn() && (
                <div>
                    {!showInput ? (
                        <button onClick={() => setShowInput(true)}>
                            Add Comment
                        </button>
                    ) : (
                        <div>
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a comment..."
                            />
                            <button onClick={handleAddComment}>
                                Post
                            </button>
                            <button onClick={() => setShowInput(false)}>
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            )}

            {!isLoggedIn() && <p>Please <span onClick={() => navigate(`/login`)}><strong>login</strong></span> to comment</p>}
        </div>
    );
};

export default Post;