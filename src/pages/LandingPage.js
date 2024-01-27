import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function LandingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id === undefined) {
      navigate("/oupYxAriFzUIFZuECtrYisK7AgV2");
    } else {
      localStorage.setItem("arbiwebAdmin", id);
    }
  }, [id, navigate]);

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-4">
          Velkommen til vores Arbitrage bureau
        </h1>
        <p className="text-lg mb-8">
          Vil du tjene 1500 kr. på bare 3 timer? Så er du kommet til det rette
          sted.
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
