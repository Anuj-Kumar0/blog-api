import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { isLoggedIn } from "../services/auth";
import Header from "../components/Header";

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
    <div className="container page">
      <Header />

      <h3>
        <LogoutButton />
      </h3>

      {isLoggedIn() && (
        <>
          <h1>Dashboard</h1>

          <button onClick={() => navigate("/new")}>NEW POST</button>
        </>
      )}

      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => navigate(`/post/${post.id}`)}
          className="post-card"
        >
          <h3 className="post-title">{post.title}</h3>

          <p className="post-meta">
            By <strong>{post.author?.username}</strong> • Created{" "}
            {new Date(post.createdAt).toLocaleString()}
            {new Date(post.updatedAt).getTime() !==
              new Date(post.createdAt).getTime() && (
              <> • Edited {new Date(post.updatedAt).toLocaleString()}</>
            )}
          </p>

          <p className={`badge ${post.isPublished ? "published" : "draft"}`}>
            {post.isPublished ? "Published" : "Draft"}
          </p>

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
    </div>
  );
};

export default Dashboard;
