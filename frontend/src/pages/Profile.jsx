import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserData.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    async function getUserData() {
      try {
        if (token?.refresh_token) {
          const res = await axios.get(
            "http://localhost:8000/api/auth/userDetails",
            {
              headers: {
                Authorization: `Bearer ${token.refresh_token}`,
              },
            }
          );
          setUser(res.data);
        }
      } catch (error) {
        console.error("User fetch error:", error);
      }
    }

    getUserData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-center">

        <h1 className="text-2xl font-bold mb-6">👤 User Profile</h1>

        {user.name ? (
          <>
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-24 h-24 mx-auto rounded-full border mb-4 object-cover"
            />

            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-gray-600 mb-6">{user.email}</p>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
