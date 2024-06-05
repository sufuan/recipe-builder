import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";

export default function GoogleLogin() {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <div>
      <button
        onClick={() => {
          signInWithGoogle().then((data) => {
            if (data?.user?.email) {
              const userInfo = {
                email: data.user.email,
                name: data.user.displayName || "Google User", // default name if displayName is not available
              };

              fetch(
                "https://project-stride-blog-server-e6o9.vercel.app/api/users/register",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(userInfo),
                }
              )
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.error("Error:", err));
            }
          });
        }}
        className="px-5 py-3 bg-yellow-500 text-white w-full rounded-lg"
      >
        Google Login
      </button>
    </div>
  );
}
