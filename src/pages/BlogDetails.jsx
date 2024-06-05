import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`https://project-stride-blog-server-e6o9.vercel.app/api/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-4">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-3/4 h-96 object-cover rounded"
        />
      </div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-4">Author: {post.author.name}</p>
      <p className="text-gray-700 mb-4">{post.body}</p>
    </div>
  );
};

export default BlogDetails;
