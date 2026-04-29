import { useState } from "react";
import API from "../services/api";
import { Editor } from "@tinymce/tinymce-react";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    await API.post("/posts/", {
      title,
      content,
      isPublished: true,
    });

    window.location.href = "/";
  };

  const tinyMceApiKey = "87kcfmryz5abua15jp4bq8iyzgcto0wbfpif7254fqjeoapp";

  return (
    <div className="container page">
      <h2>Create New Blog Post</h2>

      <input
        className="new-post-title-input"
        placeholder="Enter your post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Editor
        apiKey={tinyMceApiKey}
        value={content}
        onEditorChange={(newValue) => setContent(newValue)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
                         alignleft aligncenter alignright alignjustify | \
                         bullist numlist outdent indent | removeformat | help",
        }}
      />

      <div className="new-post-submit-btn-container">
        <button className="new-post-submit-btn" onClick={handleSubmit}>
          Publish Post
        </button>
      </div>
    </div>
  );
};

export default NewPost;
