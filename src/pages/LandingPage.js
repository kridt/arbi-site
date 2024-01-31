import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

export default function LandingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [wellcome, setWellcome] = useState({});

  useEffect(() => {
    if (id === undefined) {
      navigate("/oupYxAriFzUIFZuECtrYisK7AgV2");
      db.collection("admins")
        .doc("oupYxAriFzUIFZuECtrYisK7AgV2")
        .get()
        .then((doc) => {
          setUser(doc.data());
          if (doc.exists) {
            console.log("Document data:", doc.data());
            setWellcome({
              title: doc?.data()?.config?.velkomstSide?.title,
              text: doc?.data()?.config?.velkomstSide?.text,
            });
            setLoading(false);
          } else {
            console.log("No such document!");
            alert("der er sket en fejl, prøv igen senere");
          }
        });
    } else {
      localStorage.setItem("arbiwebAdmin", id);
      db.collection("admins")
        .doc(id)
        .get()
        .then((doc) => {
          setUser(doc.data());
          if (doc.exists) {
            console.log("Document data:", doc.data());
            setWellcome({
              title: doc?.data()?.config?.velkomstSide?.title,
              text: doc?.data()?.config?.velkomstSide?.text,
            });
            setLoading(false);
          } else {
            console.log("No such document!");
            alert("der er sket en fejl, prøv igen senere");
          }
        });
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="bg-slate-900 text-white min-h-screen">Loading...</div>
    );
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-4">{wellcome?.title}</h1>
        <p className="text-lg mb-8">{wellcome?.text}</p>
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
