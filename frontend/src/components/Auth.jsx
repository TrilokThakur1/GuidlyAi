import React, { useEffect, useContext } from "react";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserData.jsx";

const Auth = () => {
  const navigate = useNavigate();
  let { token } = useContext(UserContext);

  useEffect(() => {
    if (token.access_token != null) {
      navigate("/profile");
    }
  }, [navigate, token]);

  const success = (msg) => toast.success(msg);
  const error = (msg) => toast.error(msg);

  async function handleSignIn(e) {
    e.preventDefault();
    let data = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    let res = await axios.post("http://localhost:8000/api/auth/login", data);
    if (res.status === 200) {
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      navigate("/");
      success(res.data.message);
    } else {
      error(res.data.message);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    let data = {
      name: e.target[0].value,
      avatar: e.target[1].value,
      email: e.target[2].value,
      password: e.target[3].value,
    };
    let res = await axios.post("http://localhost:8000/api/auth/register", data);
    if (res.status == 201) {
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      navigate("/profile");
      success(res.data.message);
    } else {
      error(res.data.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Welcome to
          <span className="text-indigo-600">The Guidly</span>
        </h2>

        <Tabs>
          {/* Tabs */}
          <TabList className="flex mb-6 border-none bg-gray-300 rounded-full">
            <Tab
              className="w-1/2 text-center py-2 font-semibold text-gray-500 cursor-pointer"
              selectedClassName="text-indigo-600  "
            >
              Sign In
            </Tab>
            <Tab
              className="w-1/2 text-center py-2 font-semibold text-gray-500 cursor-pointer"
              selectedClassName="text-pink-600 "
            >
              Sign Up
            </Tab>
          </TabList>

          {/* Sign In */}
          <TabPanel>
            <form onSubmit={handleSignIn} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Sign In
              </button>
            </form>
          </TabPanel>

          {/* Sign Up */}
          <TabPanel>
            <form onSubmit={handleSignUp} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Avatar URL"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Sign Up
              </button>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
