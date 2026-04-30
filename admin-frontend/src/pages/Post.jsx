import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import DOMPurify from "dompurify";
import LogoutButton from "../components/LogoutButton";
import Header from "../components/Header";
import { jwtDecode } from "jwt-decode";
import { isLoggedIn, getToken } from "../services/auth";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = getToken();
  const user = token ? jwtDecode(token) : null;

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

  const handleDeleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);
      fetchPost();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <div className="container page">
      <Header />
      <div className="top-bar">
        <button onClick={() => navigate(`/`)}>Back</button>
        <LogoutButton />
      </div>

      <h1>{post.title}</h1>

      <p style={{ fontSize: "14px", color: "gray" }}>
        By <strong>{post.author?.username}</strong> •{" "}
        {new Date(post.createdAt).toLocaleString()}
        {new Date(post.updatedAt).getTime() !==
          new Date(post.createdAt).getTime() && (
            <> • Edited {new Date(post.updatedAt).toLocaleString()}</>
          )}
      </p>

      <p style={{ color: "gray" }}>
        {post.isPublished ? "🟢 Published" : "🟡 Draft"}
      </p>

      <div
        className="post-content"
        style={{ lineHeight: "1.6" }}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      <hr />

      <h3>Comments</h3>
      {post.comments?.length > 0
        ? post.comments.map((c) => (
          <div key={c.id} className="comment">
            <div className="comment-header">
              <span className="comment-user">{c.user?.username}</span>
              <span className="comment-date">
                {new Date(c.createdAt).toLocaleString()}
              </span>

              {user && (user.id === c.userId || user.role === "admin") && (
                <button
                  className="comment-delete"
                  onClick={() => handleDeleteComment(c.id)}
                >
                  Delete
                </button>
              )}
            </div>

            <p className="comment-content">{c.content}</p>
          </div>
        ))
        : null}
    </div>
  );
};

export default Post;
