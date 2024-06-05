import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Select,
  DatePicker,
  Form,
  Row,
  Col,
  message,
} from "antd";

const { Option } = Select;

export default function EditProfile() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    contactNo: "",
    address: "",
    gender: "",
    birthday: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prevData) => ({
      ...prevData,
      birthday: dateString,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    console.log(formData);

    const token = localStorage.getItem("token");

    axios
      .put(
        `https://project-stride-blog-server-e6o9.vercel.app/api/users/${user?.email}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("User info updated successfully:", response.data);
        message.success("Profile updated successfully!");
        setTimeout(() => {
          navigate("/dashboard/profile");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating user info:", error);
        message.error("Failed to update profile. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
      <Form
        onFinish={handleSubmit}
        className="space-y-4"
        initialValues={formData}
      >
        <Form.Item label="Name" name="name">
          <Input
            id="name"
            name="name"
            onChange={handleChange}
            disabled={loading}
          />
        </Form.Item>
        <Form.Item
          label="Contact No."
          name="contactNo"
          rules={[
            { pattern: /^[0-9]*$/, message: "Please enter a valid number!" },
          ]}
        >
          <Input
            id="contactNo"
            name="contactNo"
            onChange={handleChange}
            disabled={loading}
          />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input
            id="address"
            name="address"
            onChange={handleChange}
            disabled={loading}
          />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Select
            id="gender"
            onChange={(value) =>
              setFormData((prevData) => ({ ...prevData, gender: value }))
            }
            disabled={loading}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Birthday" name="birthday">
          <Row gutter={8}>
            <Col span={16}>
              <DatePicker
                format="MM-DD"
                onChange={handleDateChange}
                picker="date"
                disabled={loading}
              />
            </Col>
            <Col span={8}>
              <Input
                placeholder="Year"
                name="birthdayYear"
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    birthday: prevData.birthday
                      ? `${prevData.birthday.split("-")[0]}-${
                          prevData.birthday.split("-")[1]
                        }-${e.target.value}`
                      : `-${e.target.value}`,
                  }))
                }
                disabled={loading}
              />
            </Col>
          </Row>
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={loading}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
}
