import React from "react";
import { useNavigate } from "react-router-dom";

export default function Thanks() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 10000);

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center pt-9">
        Fedt! du gerne vil tjene nogle nemme penge!
      </h2>
      <p>
        Vi har ekstremt travlt i øjeblikket, og vil derfor tage kontakt til dig
        når vi for en ledig plads!
      </p>
    </div>
  );
}
