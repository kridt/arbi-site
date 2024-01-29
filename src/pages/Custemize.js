import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Custemize() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [wellcome, setWellcome] = useState({
    title: "Velkommen til vores Arbitrage Bereau",
    text: "Vil du tjene 1500 kr. på bare 3 timer? Så er du kommet til det rette sted.",
  });

  useEffect(() => {
    if (auth?.currentUser) {
      console.log(auth?.currentUser);

      const fetchData = async () => {
        db.collection("admins")
          .doc(auth?.currentUser?.uid)
          .get()
          .then((doc) => {
            setUser(doc.data());
            if (doc.exists) {
              setWellcome({
                title: doc?.data()?.config?.velkomstSide?.title,
                text: doc?.data()?.config?.velkomstSide?.text,
              });
              setLoading(false);
            } else {
              console.log("No such document!");
              alert("der er sket en fejl, prøv igen senere");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
        fetchData();
      };
    } else {
      console.log("No user");
      navigate("/login");
    }
  }, [navigate, user, wellcome.title, wellcome.text]);
  console.log(user);
  async function newWellcome(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const text = e.target.text.value;
    console.log(title, text);

    await db
      .collection("admins")
      .doc(auth?.currentUser?.uid)
      .update({
        config: {
          velkomstSide: {
            title: title,
            text: text,
          },
        },
      })
      .then(() => {
        alert("opdateret");
        navigate("/admin");
      });
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <Link to="/admin">Tilbage</Link>
      <h1 className="text-center text-2xl">
        Her kan du ændre i teksten dine kunder ser
      </h1>

      <div className="flex flex-col">
        <h2 className="text-xl">Velkomst side</h2>
        <form
          onSubmit={(e) => newWellcome(e)}
          className="flex flex-col w-1/2 justify-center m-auto mb-10"
        >
          <label>Titel</label>
          <input
            className="text-black"
            defaultValue={wellcome.title}
            type="text"
            name="title"
            onChange={(e) =>
              setWellcome({ ...wellcome, title: e.target.value })
            }
          />
          <label>tekst</label>
          <textarea
            className="text-black"
            defaultValue={wellcome.text}
            type="text"
            name="text"
            onChange={(e) => setWellcome({ ...wellcome, text: e.target.value })}
          ></textarea>
          <button type="submit" className="bg-slate-600 w-1/6 mt-5">
            Opdater
          </button>
        </form>
        <div className="bg-slate-500">
          <p>Sådan ser det ud</p>
          <div className="h-80 w-9/16 bg-slate-900 p-10 m-10">
            <h1 className="text-3xl font-bold mb-4">{wellcome.title}</h1>
            <p className="text-base mb-8">{wellcome.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
