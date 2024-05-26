import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { FiLogOut } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase.config";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [changeHeader, setChangeHeader] = useState(false);

  //header change function
  const onChangeHeader = () => {
    if (window.scrollY >= 50) {
      setChangeHeader(true);
    } else {
      setChangeHeader(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  // Set up the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", onChangeHeader);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", onChangeHeader);
    };
  }, []);

  return (
    <header
      className={
        changeHeader
          ? "bg-white fixed z-50 top-0 left-0 w-full shadow-md transition duration-500"
          : "bg-transparent fixed z-50 top-0 left-0 w-full transition duration-500"
      }
    >
      <nav className="flex items-center max-w-screen-xl mx-auto px-6 py-3">
        {/* left  */}
        <div className="flex flex-grow">
          <img
            className="w-36 cursor-pointer"
            src={logo}
            alt="logo"
            style={{ width: "50px" }}
          />
        </div>
        {/* right  */}
        {user ? (
          <div className="flex items-center justify-end space-x-4">
            <NavLink to="/dashboard" className="text-gray-600">
              Dashboard
            </NavLink>
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-10 h-10 rounded-full"
            />
            <p className="text-gray-700 poppins hidden md:block lg:block">
              {user.displayName}
            </p>
            <FiLogOut
              className="cursor-pointer w-6 h-6 text-gray-700"
              onClick={handleLogout}
            />
          </div>
        ) : (
          <div className="flex items-center justify-end space-x-6">
            <Link to="/signin" className="poppins">
              <button className="poppins">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
