import { Rating } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

export default function RateMe() {
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(id);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <div className="flex flex-col justify-center">
        <h1>Tak for du var en del af vores hold!</h1>

        <Rating
          name="simple-controlled"
          onChange={(e) => console.log(e.target.value)}
          value={1}
          sx={{ fontSize: 50 }}
        />
        <form onSubmit={handleSubmit}></form>
      </div>
    </div>
  );
}
