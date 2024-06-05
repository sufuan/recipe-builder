import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import { auth } from "../firebase/firebase.config";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User registered:", user);

        // Create a photo URL using the first letter of the name
        const firstLetter = name.charAt(0).toUpperCase();
        const photoURL = `https://ui-avatars.com/api/?name=${firstLetter}&background=random&size=128`;

        // Update the user's profile with the display name and photoURL
        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            console.log(
              "Profile updated with name and photo URL:",
              name,
              photoURL
            );

            const userInfo = { name, email };

            // Send user info to the backend using Axios
            axios
              .post(
                "https://project-stride-blog-server-e6o9.vercel.app/api/users/register",
                userInfo,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                console.log("Response from API:", response.data);
                // Optionally, handle the response from the backend
                navigate("/"); // Navigate to the desired route upon successful registration
              })
              .catch((error) => {
                console.error("Error sending user info to backend:", error);
                setError(error.message);
              });
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
            setError(error.message);
          });
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        setError(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content grid grid-cols-2 w-full mx-auto">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shadow-2xl bg-base-100 max-w-lg">
          <form onSubmit={handleSubmit} className="card-body">
            {error && <p className="text-red-500">{error}</p>}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-2">
              <button className="btn btn-primary">Register</button>
              <p className="text-center">
                Already have an account?{" "}
                <Link to={"/signin"} className="text-orange-500">
                  Login
                </Link>
              </p>
            </div>
          </form>
          <div className="w-full">
            <div className="flex flex-col gap-2 mx-7 mb-7"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
