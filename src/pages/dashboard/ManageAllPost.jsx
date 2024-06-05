import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Space, Input, Button, Spin, Popconfirm, message } from "antd";

const ManageAllRecipe = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (userId) {
      setLoading(true); // Set loading to true while fetching posts
      axios
        .get(
          `https://project-stride-blog-server-e6o9.vercel.app/api/readpost/${userId}`
        )
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => console.error("Error fetching post:", error))
        .finally(() => setLoading(false)); // Set loading to false after fetching posts
    }
  }, [userId]);

  const handleEdit = (post) => {
    setEditingId(post._id);
    setNewTitle(post.title);
    setNewBody(post.body);
  };

  const handleUpdate = () => {
    setLoading(true); // Set loading to true when saving
    axios
      .put(
        `https://project-stride-blog-server-e6o9.vercel.app/api/updatepost/${editingId}`,
        {
          title: newTitle,
          body: newBody,
        }
      )
      .then((response) => {
        message.success("Post updated successfully!"); // Add success message
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === editingId ? response.data.post : post
          )
        );
        setEditingId(null);
        setNewTitle("");
        setNewBody("");
      })
      .catch((error) => console.error("Error updating post:", error))
      .finally(() => setLoading(false)); // Set loading to false after saving
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://project-stride-blog-server-e6o9.vercel.app/api/deletepost/${id}`
      )
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
        message.success("Post deleted successfully!");
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title, record) => (
        <Space size="middle">
          {editingId === record._id ? (
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          ) : (
            title
          )}
        </Space>
      ),
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      render: (body, record) => (
        <Space size="middle">
          {editingId === record._id ? (
            <Input.TextArea
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
            />
          ) : (
            body
          )}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {editingId === record._id ? (
            <>
              <Button type="primary" onClick={handleUpdate}>
                Save
              </Button>
              <Button onClick={() => setEditingId(null)}>Cancel</Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={() => handleEdit(record)}>
                Edit
              </Button>
              <Popconfirm
                title="Are you sure to delete this post?"
                onConfirm={() => handleDelete(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto w-full px-16 mt-10">
      <h1 className="text-3xl mb-4">Manage All Recipes</h1>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={posts}
          rowKey="_id"
          pagination={{ pageSize: 10 }} // Change pageSize as per your requirement
        />
      </Spin>
    </div>
  );
};

export default ManageAllRecipe;
