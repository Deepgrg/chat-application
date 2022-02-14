import { useEffect, createContext } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { socket } from "../services/socket";

const Dashboard = () => {
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    socket.emit("login", { username: username });

    return () => {
      socket.on("disconnect", () => {
        console.log(`${username} disconnected.`);
      });

      socket.off();
    };
  }, [username]);

  return (
    <div className="bg-gray-200">
      <div className="h-screen max-w-3xl mx-auto flex items-center justify-center ">
        <div className="w-3/4 h-3/4 bg-white flex flex-col items-center justify-start p-10 rounded-lg space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <p className="text-3xl font-semibold">Welcome {username}.</p>
            <p className="text-gray-600">Please select a room to join</p>
          </div>
          {/*  Global chat  */}
          <Link
            href={{
              pathname: "/globalChat",
              query: {
                username: username,
              },
            }}
            passHref
          >
            <div className="bg-green-300 w-5/6 px-4 py-5 rounded-md border-2 border-solid border-gray-800 border-opacity-25 cursor-pointer">
              Global Chat
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
