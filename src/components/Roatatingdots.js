import React from "react";

export default function Roatatingdots() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="">Loading </h1>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
