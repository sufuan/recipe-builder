import axios from "axios";
import { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import PostCard from "../components/cards/PostCard"; // Import the PostCard component

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://project-stride-blog-server-e6o9.vercel.app/api/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto my-16">
      <h1 className="text-3xl font-bold my-6">All Posts</h1>
      <Spin spinning={loading}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.reverse().map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        <Pagination
          className="mt-4"
          current={currentPage}
          total={posts.length}
          pageSize={postsPerPage}
          onChange={paginate}
        />
      </Spin>
    </div>
  );
};

export default BlogPage;
