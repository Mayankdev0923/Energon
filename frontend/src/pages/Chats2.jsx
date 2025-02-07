import React, { useState, useEffect, useContext, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const ChatDashboard = () => {
  const [socket, setSocket] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientUser, setRecipientUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recentChats, setRecentChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const userId = localStorage.getItem("userId");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromUrl = params.get("email");
    if (emailFromUrl) {
      setRecipientEmail(emailFromUrl);
      // Automatically trigger the find recipient function
      findRecipient(emailFromUrl);
    }
  }, []);

  // Separate useEffect for socket initialization
  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.emit("authenticate", { userId });

    return () => {
      newSocket.close();
    };
  }, [userId]);

  // Separate useEffect for socket event listeners
  useEffect(() => {
    if (!socket) return;

    const messageHandler = (message) => {
      setMessages((prevMessages) => {
        // Check if message already exists to prevent duplicates
        const messageExists = prevMessages.some(
          (msg) =>
            msg.content === message.content &&
            msg.senderId === message.senderId &&
            msg.timestamp === message.timestamp
        );

        if (messageExists) return prevMessages;

        return [
          ...prevMessages,
          {
            ...message,
            isSelf: message.senderId === userId,
          },
        ];
      });

      // Update recent chats
      setRecentChats((prevChats) => {
        const updatedChats = [...prevChats];
        const chatIndex = updatedChats.findIndex(
          (chat) =>
            chat._id ===
            (message.senderId === userId
              ? message.recipientId
              : message.senderId)
        );

        if (chatIndex !== -1) {
          updatedChats[chatIndex] = {
            ...updatedChats[chatIndex],
            lastMessage: message.content,
            timestamp: new Date(),
          };
          // Move the updated chat to the top
          const [chat] = updatedChats.splice(chatIndex, 1);
          return [chat, ...updatedChats];
        }
        return prevChats;
      });
    };

    socket.on("receive_message", messageHandler);
    socket.on("send_private_message", messageHandler);

    return () => {
      socket.off("receive_message", messageHandler);
      socket.off("send_private_message", messageHandler);
    };
  }, [socket, userId]);

  // Separate useEffect for loading recent chats
  useEffect(() => {
    const loadRecentChats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/recent-chats`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: { userId },
          }
        );
        setRecentChats(response.data);
      } catch (error) {
        console.error("Failed to load recent chats", error);
      }
    };

    loadRecentChats();
    // Set up interval to refresh chats
    const intervalId = setInterval(loadRecentChats, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId);
  }, [userId]);

  const findRecipient = async (email = recipientEmail) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/find-user?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRecipientUser(response.data);
      loadChatHistory(response.data);
    } catch (error) {
      console.error("User not found", error);
      alert("User not found");
    }
  };

  const loadChatHistory = async (user) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/chat-history`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            userId,
            recipientId: user._id,
          },
        }
      );

      setMessages(response.data);
      setSelectedChat(user);
    } catch (error) {
      console.error("Failed to load chat history", error);
    }
  };

  const sendMessage = async () => {
    if (socket && newMessage && selectedChat) {
      const messageData = {
        senderId: userId,
        recipientId: selectedChat._id,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };

      try {
        socket.emit("send_private_message", messageData);

        // Update messages immediately for better UX
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...messageData, isSelf: true },
        ]);

        // Update recent chats
        setRecentChats((prevChats) => {
          const updatedChats = [...prevChats];
          const chatIndex = updatedChats.findIndex(
            (chat) => chat._id === selectedChat._id
          );

          if (chatIndex !== -1) {
            const [chat] = updatedChats.splice(chatIndex, 1);
            return [
              {
                ...chat,
                lastMessage: newMessage,
                timestamp: new Date(),
              },
              ...updatedChats,
            ];
          }
          return prevChats;
        });

        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  };

  // Rest of your component remains the same...
  return (
    <div className="flex h-screen max-w-7xl w-full space-x-8">
      {/* Sidebar for Recent Chats */}
      <div className="w-1/4  bg-black backdrop-blur-md bg-opacity-50 overflow-y-auto z-10 rounded-3xl px-4">
        <div className="text-3xl text-white font-bold text-center mt-6">
          Chats
        </div>
        <div className="p-4 ">
          <input
            type="email"
            placeholder="Enter recipient's email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="w-full p-2 rounded-xl mb-2 text-center text-white bg-white bg-opacity-20 backdrop-blur-md"
          />
          <button
            onClick={findRecipient}
            className="w-full bg-green-900 text-white p-2 rounded-xl mt-2"
          >
            Find User
          </button>
        </div>

        {/* Recent Chats List */}
        {recentChats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => loadChatHistory(chat)}
            className={`rounded-xl p-4 mb-2 mx-2 cursor-pointer border border-gray-600 text-white hover:text-black hover:bg-gray-700 ${
              selectedChat?._id === chat._id
                ? "bg-gray-700 bg-opacity-50 text-white"
                : ""
            }`}
          >
            <div className="font-bold">{chat.username}</div>
            <div
              className={`text-sm text-gray-100 truncate ${
                selectedChat?._id === chat._id ? "text-gray-300" : ""
              }`}
            >
              {chat.lastMessage}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex-grow flex flex-col bg-black bg-opacity-50  rounded-3xl">
        {selectedChat ? (
          <>
            <div className="p-6 z-10 border-b border-gray-600">
              <h2 className="text-xl text-center font-bold text-white">
                Chat with {selectedChat.username}
              </h2>
            </div>
            <div className="flex-grow overflow-y-auto px-4 py-8">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 flex ${
                    msg.isSelf ? "justify-end" : "justify-start"
                  }`}
                >
                  <span
                    className={`inline-block p-4 rounded-2xl text-black max-w-3/4 ${
                      msg.isSelf
                        ? "bg-green-200 bg-opacity-80"
                        : "bg-gray-200 bg-opacity-80"
                    }`}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 m-2 border-t border-gray-500 rounded-b-2xl flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow text-white p-2 rounded-bl-2xl  bg-white bg-opacity-10 backdrop-blur-md"
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-green-900 text-white p-4  rounded-br-2xl"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDashboard;
