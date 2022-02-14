import React, { useState } from "react";
import { useRouter } from "next/router";

const Index = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username === "") username = "Anonymous";
    router.push({
      pathname: "dashboard",
      query: { username: username },
    });
  };
  return (
    <div className="w-full min-h-screen bg-gray-200">
      <div className="max-w-5xl mx-auto h-screen flex items-center justify-center">
        <div className="w-4/6 bg-white h-3/4 rounded-md shadow-lg border-solid flex items-center justify-center">
          <div className="h-1/2  flex flex-col justify-around items-center">
            {/* Greeting */}
            <div className="flex flex-col justify-center items-center space-y-3">
              <h3 className="text-3xl font-semibold">
                Welcome to the realtime chat application
              </h3>
              <p className="text-gray-600">
                Register a username and start chatting
              </p>
            </div>

            {/* Form */}
            <form
              className="flex flex-col items-center space-y-4"
              onSubmit={(e) => handleFormSubmit(e)}
            >
              <div className="space-x-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="outline-none border-2 border-gray-400 text-gray-800 font-semibold px-3 py-2 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-400 px-3 py-3 rounded-lg"
              >
                Join Chat
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
