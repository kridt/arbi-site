import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
export default function Start() {
  const navigate = useNavigate();
  const admin = localStorage.getItem("arbiwebAdmin");
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({
    title: "Arbitrage Bereau - Start her",
    text: "Her er alle de gamblingsites vi kommer til at bruge, tjek af fra listen over de sites du allerede har en konto på (En konto, hvor bonus IKKE er brugt, skal IKKE vinges af)",
  });
  const [sites, setSites] = useState([
    "Betfair",
    "Unibet",
    "Bet365",
    "LeoVegas",
    "ComeOn",
    "Bwin",
    "NordicBet",
    "Betsson",
    "Bet25",
    "Tipwin",
    "Expekt",
    "CashPoint",
  ]);

  useEffect(() => {
    if (admin === null) {
      navigate("/");
    } else {
      console.log(admin);
    }

    db.collection("admins")
      .doc(admin)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const sites = doc.data().sites;
          setSites(sites);
          setConfig(doc?.data()?.config?.bettingSide);
          setLoading(false);
        } else {
          console.log("No such document!");
        }
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const checkedSites = [];
    for (let entry of formData.entries()) {
      checkedSites.push(entry[0]);
    }

    localStorage.setItem("sites", JSON.stringify(checkedSites));
    navigate("/stage2");
  }

  if (loading) {
    return (
      <div className="bg-slate-900 text-white min-h-screen">Loading...</div>
    );
  }
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center pt-9">
        {config?.title}
      </h2>
      <form onSubmit={(e) => handleSubmit(e)} className="w-1/2 m-auto">
        <div className="mb-4">
          <label htmlFor="siteName" className="block font-medium mb-2">
            {config?.text}
          </label>
        </div>

        <div>
          {sites?.map((site) => {
            return (
              <div key={site}>
                <input
                  type="checkbox"
                  id={site}
                  name={site}
                  value={site}
                  className="mr-2"
                />
                <label htmlFor={site}>{site}</label>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Videre
          </button>
        </div>
      </form>
    </div>
  );
}
