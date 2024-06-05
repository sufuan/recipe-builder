import { useState, useEffect } from "react";
import Banner from "../components/home/Banner";
import PostCard from "../components/cards/PostCard";
import Skeleton from "../components/cards/Skeleton";
import { Link } from "react-router-dom";
import Sponser from "../components/home/Sponser";
import Newsletter from "../components/home/NewsLetter";
import Testimonial from "../components/home/Testimonials";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function load() {
      const postRes = await fetch(
        "https://project-stride-blog-server-e6o9.vercel.app/api/posts"
      );
      const postData = await postRes.json();
      setPosts(postData);
    }
    load();
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [posts]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Banner searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      <div className="mx-16">
        <h1 className="text-4xl my-6 text-center">Our Newest Post</h1>
        <Link
          to={`/blogs/`}
          className="text-blue-500 hover:underline block text-right my-6"
        >
          View all posts
        </Link>

        <div className="grid grid-cols-4 gap-6">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, index) => <Skeleton key={index} />)
            : filteredPosts
                .reverse()
                .slice(0, 4)
                .map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>

      <Sponser />
      <Testimonial></Testimonial>

      <Newsletter />
    </div>
  );
}
