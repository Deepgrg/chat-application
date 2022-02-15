import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { socket } from "../services/socket";

const Dashboard = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const router = useRouter();
  const { username } = router.query;

  // User logs in
  useEffect(() => {
    socket.emit("login", { username: username });
  }, [username]);

  // to get currently online users
  useEffect(() => {
    let isRendered = true;
    socket.on("onlineUsers", ({ users }) => {
      if (isRendered) {
        setOnlineUsers(users);
      }
    });

    return () => {
      isRendered = false;
    };
  }, [onlineUsers]);

  return (
    <div className="bg-gray-200">
      <div className="h-screen max-w-7xl mx-auto flex items-center justify-center ">
        <div className="w-3/4 h-3/4 bg-white flex flex-col items-center justify-start p-10 rounded-lg space-y-6">
          {/* Greeting */}
          <div className="flex flex-col items-center space-y-3">
            <p className="text-3xl font-semibold">Welcome {username}.</p>
            <p className="text-gray-600">
              Please select a <span className="font-bold">room</span> to join or
              a <span className="font-bold">user</span> to chat with
            </p>
          </div>
          <div className="grid grid-cols-4 gap-10 w-full ">
            {/*  Rooms  */}
            <div className="col-span-3 w-full space-y-3">
              <p className="text-gray-500 mb-3">Rooms:</p>
              {/* Global chat */}
              <Link
                href={{
                  pathname: "/chat",
                  query: {
                    username: username,
                    room: "Global",
                  },
                }}
                passHref
              >
                <div className="bg-green-200 w-full px-4 py-5 rounded-md border-2 border-solid border-gray-800 border-opacity-25 cursor-pointer shadow-lg hover:underline">
                  Global Chat
                </div>
              </Link>
              {/* Philosophy */}
              <Link
                href={{
                  pathname: "/chat",
                  query: {
                    username: username,
                    room: "Philosophy",
                  },
                }}
                passHref
              >
                <div className="bg-neutral-200 w-full px-4 py-5 rounded-md border-2 border-solid border-gray-800 border-opacity-25 cursor-pointer shadow-lg hover:underline">
                  Philosophy
                </div>
              </Link>
            </div>
            {/* Active Users */}
            <div className="col-span-1 w-full space-y-3">
              <p className="text-gray-500 mb-3">
                Online Users ({onlineUsers.length})
              </p>
              {onlineUsers.map((user, index) => {
                return (
                  <div
                    key={index}
                    className="bg-neutral-200 w-full px-4 py-5 rounded-md border-2 border-solid border-gray-800 border-opacity-25 cursor-pointer shadow-lg hover:underline"
                  >
                    {`${user.username} ${
                      user.username == username ? "(you)" : ""
                    }`}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
