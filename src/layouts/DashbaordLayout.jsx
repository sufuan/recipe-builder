import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashbaordLayout() {
  const [signOut] = useSignOut(auth);
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://project-stride-blog-server-e6o9.vercel.app/api/users/${user?.email}`
        )
        .then((data) => setUserInfo(data?.data?.user));
    }
  }, [user]);

  console.log(userInfo._id);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-60 min-h-screen bg-base-200 text-base-content flex flex-col justify-between">
          {/* Sidebar content here */}
          <div>
            <li>
              <Link to={`/dashboard/manage-my-post/${userInfo._id}`}>
                Manage My Post
              </Link>
            </li>
            <li>
              <Link to={`/dashboard/add-post/${userInfo._id}`}>
                Create Post
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/profile"}>Profile</Link>
            </li>
          </div>
          <div className="flex gap-4">
            <Link to={"/"} className="btn btn-neutral">
              Home
            </Link>
            <button className="btn btn-error" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
}
