import { useState } from "react";
import API from "../services/api";

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

    return (
        <div>
            <h2>New Post</h2>

            <input placeholder="title" onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="content" onChange={(e) => setContent(e.target.value)} />

            <button onClick={handleSubmit}>Create</button>
        </div>
    );
};

export default NewPost;