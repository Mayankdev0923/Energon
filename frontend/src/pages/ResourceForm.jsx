import React from "react";
import FormContent from "../components/FormContent";

export default function FormContainer() {
  return (
    <div className="min-h-screen bg-[url('/Chats.png')] bg-cover bg-center p-6 md:p-16 lg:p-40 flex items-center justify-center bg-zinc-900 w-full">
      {/* Main container */}
      <div className="relative w-full sm:mt-40 md:mt-20 lg:mt-5  max-w-8xl rounded-[32px] md:rounded-[56px] bg-black/50 border border-gray-500 backdrop-blur-sm overflow-hidden flex justify-center items-center">
        <div className="relative w-full mx-10 my-10 rounded-[20px] md:rounded-[30px] bg-black/50 border border-gray-500 backdrop-blur-sm overflow-hidden">
          {/* Optional outline effect */}
          <div className="absolute inset-0 rounded-2xl border border-gray-600 -z-10 backdrop-blur-md"></div>
          {/* Child content */}
          <FormContent />
        </div>
      </div>
    </div>
  );
}
