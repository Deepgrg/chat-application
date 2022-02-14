import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

import { socket } from "../services/socket";

const GlobalChat = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { username } = router.query;

  // For a user to join a room
  useEffect(() => {
    socket.emit("joinRoom", {
      username: username,
      room: "global",
    });
  }, [username]);

  // For a user to receive messages in a room
  useEffect(() => {
    socket.on("message", (data) => {
      // Add every new message sent by admin or user to messages array
      setMessages([...messages, data]);
    });
  }, [messages]);

  // For a user to send message to a room
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("chatMessage", { message: message }, () => sendMessage(""));
    }
  };

  return (
    <div className="bg-gray-200">
      <div className=" mx-auto max-w-3xl h-screen flex items-center justify-center">
        <div className="bg-white h-5/6 w-5/6">
          {/* Chat screen */}
          <div className="">Messages screen</div>
          {/* Chat input */}
          <form onSubmit={(e) => sendMessage(e)} className="space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="outline-none border-2 border-gray-400 text-gray-800 font-semibold px-3 py-2 rounded-lg"
            />
            <button
              type="submit"
              className="bg-blue-400 px-3 py-3 rounded-lg w-20"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GlobalChat;
