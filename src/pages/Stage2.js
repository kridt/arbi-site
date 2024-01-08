import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AgeRestrictedDatePicker from "../components/over18";
import axios from "axios";
import Roatatingdots from "../components/Roatatingdots";
import "./Stage2.css";

export default function Stage2() {
  const sites = JSON.parse(localStorage.getItem("sites"));
  const navigate = useNavigate();
  const [cleanSites, setCleanSites] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingRefeal, setLoadingRefeal] = React.useState(false);
  const [referal, setReferal] = React.useState("Du har ikke nogen referal");

  React.useEffect(() => {
    if (sites?.length === 0) {
      setCleanSites(true);
    }
  }, [sites?.length]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      age: e.target.age.value,
      referal: e.target.referal.value,

      sites: cleanSites ? "clean" : sites,
      dato: new Date()
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("-"),
    };

    console.log(data);

    await axios
      .post("https://arbi-server.onrender.com/api/start", data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate("/thanks");
      });
  }

  async function findReferal(referalNumber) {
    setLoadingRefeal(true);
    await axios
      .post("https://arbi-server.onrender.com/api/referal", {
        referal: parseInt(referalNumber),
      })
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          setReferal("Du har valgt at referere " + res.data.name);
          setLoadingRefeal(false);
        } else {
          setReferal("Der er ikke nogen med det ID");
          setLoadingRefeal(false);
        }
      });

    setLoadingRefeal(false);
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 222,
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <Roatatingdots />
        </div>
      ) : null}

      <h2 className="text-2xl font-bold mb-4 text-center pt-9">
        Arbitrage Bereau - Tilmeld dig her
      </h2>
      <form onSubmit={(e) => handleSubmit(e)} className="w-1/2 m-auto ">
        {cleanSites ? (
          <h1>
            Så vi er enige om du er tilmeldt på absolut ingen af siderne? hvis
            ikke tryk{" "}
            <Link className="text-blue-600" to={"/"}>
              her!
            </Link>
          </h1>
        ) : (
          <h1>
            Så vi er enige om du er tilmeldt på{" "}
            {sites?.map((site) => {
              return site + ", ";
            })}
            ?
          </h1>
        )}

        <br />
        <p>
          For at være helt ærlige fortrækker vi selfølgelig at man ikke er
          tilmeldt nogen af siderne, men det kan godt lade sig gøre alligevel
        </p>
        <br />

        <label htmlFor="info">
          Nå, men lad os se at komme igang, vi skal starte med at du lige
          skriver din info hernede under, og du vil herefter blive kontaktet af
          en af vores fantastiske medarbejdere
        </label>
        <br />
        <br />
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Navn
          </label>
          <input
            type="text"
            id="name"
            name="name"
            min={"1900-01-01"}
            max={"2010-01-01"}
            placeholder="Både fornavn og efternavn"
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-black"
            required
          />
        </div>

        <AgeRestrictedDatePicker name={"age"} />
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="En email du tjekker ofte"
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium mb-2">
            Telefonnummer
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Et hvor vi kan få fat i dig"
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="referal">
            Og som det sidste sprøgsmål, er der nogen der har refereret dig til
            os? så skriv deres 4 cifrede ID her
          </label>
          <input
            type="number"
            id="referal"
            name="referal"
            disabled={loadingRefeal}
            onChange={(e) => {
              if (e.target.value.length === 4) {
                findReferal(e.target.value);
              } else {
                setLoadingRefeal(false);
                setReferal("Du har ikke nogen referal");
              }
            }}
            placeholder="4 cifret ID"
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-black"
          />
        </div>
        {loadingRefeal ? (
          <p className="blinking">Leder efter din referal...</p>
        ) : (
          <p>{referal}</p>
        )}

        <div className="mt-8">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Skriv dig op her!
          </button>
        </div>
      </form>
    </div>
  );
}
