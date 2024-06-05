import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin, message } from "antd";

const App = () => {
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true); // Disable the submit button
    const postData = {
      ...values,
      author: userId,
    };
    console.log(postData);

    try {
      const response = await axios.post(
        "https://project-stride-blog-server-e6o9.vercel.app/api/createpost",
        postData
      );
      console.log("Post created successfully:", response);
      message.success("Post created successfully!");
      setTimeout(() => {
        navigate(`/dashboard/manage-my-post/${userId}`);
      }, 2000); // delay to allow users to read the toast message
    } catch (error) {
      console.error("Failed to create post:", error);
      message.error("Failed to create post. Please try again.");
    } finally {
      setLoading(false); // Re-enable the submit button
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create a Post</h1>
        <Form form={form} onFinish={handleSubmit} className="space-y-4">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input
              placeholder="Enter title"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item
            label="Body"
            name="body"
            rules={[{ required: true, message: "Please input your body!" }]}
          >
            <Input.TextArea
              placeholder="Enter body"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={`w-full ${
                loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? <Spin /> : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;
