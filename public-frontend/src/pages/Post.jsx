import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { isLoggedIn, getToken } from "../services/auth";
import LogoutButton from "../components/LogoutButton";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing content
import Header from "../components/Header";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const token = getToken();
  const user = token ? jwtDecode(token) : null;

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
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      setComment("");
      setShowInput(false);
      fetchPost();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);
      fetchPost();
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) return <p>Loading...</p>;

  const sanitizedPostContent = DOMPurify.sanitize(post.content);

  return (
    <div>
      <Header />
      <h3>
        <LogoutButton />
      </h3>

      <button onClick={() => navigate(`/`)}>Back</button>

      <h1>{post.title}</h1>

      <p style={{ fontSize: "14px", color: "gray" }}>
        By <strong>{post.author?.username}</strong> •{" "}
        {new Date(post.createdAt).toLocaleString()}
      </p>

      <div
        style={{ lineHeight: "1.6" }}
        dangerouslySetInnerHTML={{ __html: sanitizedPostContent }}
      />

      <h3>Comments</h3>
      {post.comments?.map((c) => (
        <div
          key={c.id}
          style={{ display: "flex", gap: "10px", alignItems: "center" }}
        >
          <p>
            <strong>{c.user?.username}</strong> •{" "}
            {new Date(c.createdAt).toLocaleString()} <br />
            {c.content}
          </p>

          {user && (user.id === c.userId || user.role === "admin") && (
            <button onClick={() => handleDeleteComment(c.id)}>Delete</button>
          )}
        </div>
      ))}

      {isLoggedIn() && (
        <div>
          {!showInput ? (
            <button onClick={() => setShowInput(true)}>Add Comment</button>
          ) : (
            <div>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <button onClick={handleAddComment}>Post</button>
              <button onClick={() => setShowInput(false)}>Cancel</button>
            </div>
          )}
        </div>
      )}

      {!isLoggedIn() && (
        <p>
          Please{" "}
          <span onClick={() => navigate(`/login`)}>
            <strong>login</strong>
          </span>{" "}
          to comment
        </p>
      )}
    </div>
  );
};

export default Post;
