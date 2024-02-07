import React from "react";
import { auth } from "../firebase";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./AdminNav.css";

export default function AdminNav() {
  const navigate = useNavigate();

  return (
    <nav className="bg-sejLogoFarve h-full">
      <div className="w-1/2  flex m-auto">
        <Link to="/admin">
          <img src="/logoarbi.png" alt="logo" />
        </Link>
      </div>
      <ul className="ml-4 mt-6 text-white">
        <p className="text-center w-11/12">Menu</p>

        <br />
        <li>
          <NavLink className={"p-4"} to="/admin">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink className={"p-4"} to="/change">
            Ændre på kundeview
          </NavLink>
        </li>
        <li>
          <NavLink className={"p-4"} to="/kundeliste">
            Kundeliste
          </NavLink>
        </li>
      </ul>
      <button
        className={
          "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-1"
        }
        onClick={() => {
          auth?.signOut();
          navigate("/login");
        }}
      >
        Log ud
      </button>
    </nav>
  );
}
