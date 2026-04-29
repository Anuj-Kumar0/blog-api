import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import DOMPurify from "dompurify";
import Header from "../components/Header";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        console.log("API response:", res.data);
        setPosts(res.data);
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Header />

      <h3>
        <LogoutButton />
      </h3>

      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => navigate(`/post/${post.id}`)}
          style={{ cursor: "pointer", marginBottom: "20px" }}
        >
          <h2>{post.title}</h2>

          <p style={{ fontSize: "14px", color: "gray" }}>
            By <strong>{post.author?.username}</strong> •{" "}
            {new Date(post.createdAt).toLocaleString()}
          </p>

          <div
            style={{ lineHeight: "1.6" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
