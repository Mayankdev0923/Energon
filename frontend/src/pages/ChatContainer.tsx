import React from "react";
import Chats2 from "./Chats2";

function ChatContainer() {
  return (
    <div
      className={`min-h-screen bg-[url("/Chats.png")] bg-center bg-cover text-gray-100
           p-4 sm:p-8 relative overflow-hidden flex flex-col items-center justify-center`}
    >
      {" "}
      <div className="text-center mt-20 mb-8 ">
        <div className="inline-flex items-center justify-center space-x-2 mb-4">
          <h1 className="text-3xl text-white font-bold">Chats</h1>
        </div>
        <p className="text-gray-400">Chat & Trade for an efficient world.</p>
      </div>
      {/* Main container */}
      {/* Optional outline effect */}
      <div className="absolute inset-0 rounded-2xl border border-gray-600 -z-10 backdrop-blur-md"></div>
      {/* Child content */}
      <Chats2 />
    </div>
  );
}

export default ChatContainer;
