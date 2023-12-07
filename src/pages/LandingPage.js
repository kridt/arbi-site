import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-4">
          Velkommen til vores Arbitrage Bereau
        </h1>
        <p className="text-lg mb-8">
          Vil du tjene 1500 kr. på bare 3 timer? Så er du kommet til det rette
        </p>
        <Link
          to={"/start"}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Start her!
        </Link>
      </div>
    </div>
  );
}
