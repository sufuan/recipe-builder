import { Link } from "react-router-dom";
import { format } from "date-fns";

const PostCard = ({ post }) => {
  // Format createdAt to 12-hour time format with date
  const formattedDate = format(
    new Date(post.createdAt),
    "MMMM d, yyyy h:mm aa"
  );

  return (
    <div className="bg-white border border-gray-200 transition transform duration-300 hover:shadow-lg hover:scale-105 p-4 rounded-lg overflow-hidden relative">
      <figure className="mb-4">
        <img
          src={post.imageUrl}
          alt="food"
          className="w-full h-auto rounded-lg"
        />
      </figure>
      <div className="flex flex-col items-start justify-between">
        <h1 className="text-gray-900 font-bold text-3xl">{post.title}</h1>
        <p className="text-gray-600 mt-2 mb-4">{post.body}</p>
        <div className="flex items-center justify-between w-full">
          <div className="">
            <p className="text-gray-700 font-semibold">{post.author.name}</p>
            <p style={{ fontSize: "0.85rem", color: "#6B7280" }}>
              {formattedDate}
            </p>
          </div>
          <Link
            to={`/blog/${post._id}`}
            className="text-blue-500 hover:underline"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
