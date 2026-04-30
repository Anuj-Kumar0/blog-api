import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { Editor } from "@tinymce/tinymce-react";
import Header from "../components/Header";
import LogoutButton from "../components/LogoutButton";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  const tinyMceApiKey = "87kcfmryz5abua15jp4bq8iyzgcto0wbfpif7254fqjeoapp";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    };
    fetchPost();
  }, [id, navigate]);

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

    navigate(`/post/${id}`);
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
    <div className="container page">
      <Header />
      <LogoutButton />
      <h1>Edit Post</h1>

      {/* Title Input */}
      <input
        className="new-post-title-input"
        placeholder="Enter your post title"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />

      {/* TinyMCE Editor */}
      <Editor
        apiKey={tinyMceApiKey}
        value={post.content}
        onEditorChange={(newValue) => setPost({ ...post, content: newValue })}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | removeformat | help",
        }}
      />

      {/* Publish/Draft Toggle */}
      <div className="">
        <button
          className=""
          onClick={() => setPost({ ...post, isPublished: !post.isPublished })}
        >
          {post.isPublished ? "Published" : "Draft"}
        </button>
      </div>

      {/* Comments Section */}
      <h3>Comments</h3>
      {post.comments?.length > 0 ? (
        post.comments.map((c) => (
          <div key={c.id} style={{ marginBottom: "10px" }}>
            <p>{c.content}</p>
            <button onClick={() => deleteComment(c.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}

      {/* Update Button */}
      <div className="new-post-submit-btn-container">
        <button className="new-post-submit-btn" onClick={handleUpdate}>
          Update Post
        </button>
      </div>
    </div>
  );
};

export default EditPost;
