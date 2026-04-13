import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        API.get(`/posts/${id}`).then((res) => {
            setPost(res.data);
        });
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>

            <h3>Comments</h3>
            {post.comments?.map((c) => (
                <p key={c.id}>{c.content}</p>
            ))}
        </div>
    );
};

export default Post;