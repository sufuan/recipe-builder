import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import DashbaordLayout from "../layouts/DashbaordLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../pages/dashboard/DashboardHome";
import AddPost from "../pages/dashboard/AddPost";
import Profile from "../pages/dashboard/Profile";
import Blogs from "../pages/Blogs";
import EditProfile from "../pages/dashboard/EditProfile";
import Contact from "../pages/Contact";
import BlogDetails from "../pages/BlogDetails";
import ManageAllPost from "../pages/dashboard/ManageAllPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashbaordLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-profile/:id",
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "profile/",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-my-post/:userId",
        element: (
          <PrivateRoute>
            <ManageAllPost />
          </PrivateRoute>
        ),
      },
      {
        path: "add-post/:userId",
        element: (
          <PrivateRoute>
            <AddPost />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
