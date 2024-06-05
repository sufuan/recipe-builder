import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { auth } from "../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

// Register necessary components for ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardHome() {
  const [postData, setPostData] = useState([]);
  const [user] = useAuthState(auth);
  console.log(user);

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://project-stride-blog-server-e6o9.vercel.app/api/readpost/${user?.email}`
        );
        setPostData(response.data); // Adjust this based on the structure of your response data
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchData();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: postData.map((post, index) => `Post ${index + 1}`), // Customize labels as needed
    datasets: [
      {
        label: "Post Data",
        data: postData.map((post) => post.value), // Customize data extraction as needed
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Post Data",
      },
    },
  };

  return (
    <div>
      <h1>Dashboard Home</h1>
      <div>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
