import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import Infobar from "../components/Infobar";
import Message from "../components/Message";

import { socket } from "../services/socket";

const Chat = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // {username: string, text: string}

  const { username, room } = router.query;

  // For a user to join a room
  useEffect(() => {
    socket.emit("joinRoom", {
      username: username,
      room: room,
    });

    return () => {
      socket.emit("leaveRoom");
    };
  }, [username, room]);

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
      socket.emit("chatMessage", { message: message });
      setMessage("");
    }
  };

  return (
    <div className="bg-gray-200">
      <div className=" mx-auto max-w-3xl h-screen flex items-center justify-center">
        <div className="bg-white h-5/6 w-5/6 flex flex-col items-center ">
          {/* Chat window */}
          <div className="h-full w-5/6 px-5 pt-6">
            <Infobar roomName={room} />
            {/* Chat Screen */}
            <div className="h-full w-full flex flex-col m-2 border-2 border-solid border-gray-600 p-5 rounded-md space-y-3">
              {messages.map((currValue, index) => {
                return (
                  <Message
                    key={index}
                    message={currValue.text}
                    authorName={currValue.username}
                    username={username}
                  />
                );
              })}
            </div>
          </div>
          {/* Chat input */}
          <form onSubmit={(e) => sendMessage(e)} className="space-x-2 p-10">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="outline-none border-2 border-gray-400 text-gray-800 font-semibold px-3 py-2 rounded-lg w-80"
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

export default Chat;
