import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AdminNav from "../components/AdminNav";
import TopNavAdmin from "../components/TopNavAdmin";

export default function Custemize() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [wellcome, setWellcome] = useState({
    title: "Velkommen til vores Arbitrage Bereau",
    text: "Vil du tjene 1500 kr. på bare 3 timer? Så er du kommet til det rette sted.",
  });
  const [sites, setSites] = useState([]);
  const [betSites, setBetSites] = useState({
    title: "Arbitrage Bereau - Start her",
    text: "Her er alle de gamblingsites vi kommer til at bruge, tjek af fra listen over de sites du allerede har en konto på (En konto, hvor bonus IKKE er brugt, skal IKKE vinges af)",
  });
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
          bettingSide: betSites,
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

  async function newBettingSide(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const text = e.target.text.value;
    console.log(title, text);

    await db
      .collection("admins")
      .doc(auth?.currentUser?.uid)
      .update({
        config: {
          velkomstSide: wellcome,
          bettingSide: {
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

  async function getData() {
    await db
      .collection("admins")
      .doc(auth?.currentUser?.uid)
      .get()
      .then((doc) => {
        console.log(doc.data());
        setWellcome({
          title: doc?.data()?.config?.velkomstSide?.title,
          text: doc?.data()?.config?.velkomstSide?.text,
        });
        setBetSites({
          title: doc?.data()?.config?.bettingSide?.title,
          text: doc?.data()?.config?.bettingSide?.text,
        });
        setSites(doc?.data()?.sites);
        setLoading(false);
      });
  }

  useEffect(() => {
    try {
      if (auth?.currentUser) {
        getData();
      } else {
        console.log("No user");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert("der er sket en fejl, prøv igen senere");
    }
  }, []);

  if (loading) {
    return (
      <div className="flex">
        <div style={{ flex: "1" }}>
          <AdminNav />
        </div>
        <div
          style={{ flex: "6" }}
          className="bg-slate-900 min-h-screen text-white"
        >
          <TopNavAdmin link={auth?.currentUser?.uid} />
          Loading...
        </div>
      </div>
    );
  }
  return (
    <div className="bg-slate-900 min-h-screen text-white flex">
      <div style={{ flex: "1" }}>
        <AdminNav />
      </div>
      <div style={{ flex: "6" }}>
        <TopNavAdmin link={auth?.currentUser?.uid} />
        <h1 className="text-center text-2xl m-5">
          Her kan du ændre i teksten dine kunder ser
        </h1>

        <Box sx={{ width: "50%", typography: "body1", margin: "0 auto" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                textColor="white"
                onChange={handleChange}
                style={{ color: "white" }}
                aria-label="lab API tabs example"
              >
                <Tab label="Velkomst Side" value="1" />
                <Tab label="Valg af bettingsider" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="flex flex-col">
                <h2 className="text-xl">Velkomst side</h2>
                <form
                  onSubmit={(e) => newWellcome(e)}
                  className="flex flex-col w-1/2 justify-center m-auto mb-10"
                >
                  <label>Titel</label>
                  <input
                    className="text-black"
                    defaultValue={wellcome?.title}
                    type="text"
                    name="title"
                    onChange={(e) =>
                      setWellcome({ ...wellcome, title: e.target.value })
                    }
                  />
                  <label>tekst</label>
                  <input
                    className="text-black"
                    defaultValue={wellcome?.text}
                    type="text"
                    name="text"
                    onChange={(e) =>
                      setWellcome({ ...wellcome, text: e.target.value })
                    }
                  />
                  <button type="submit" className="bg-slate-600 w-1/6 mt-5">
                    Opdater
                  </button>
                </form>
                <div className="bg-slate-500">
                  <div className="h-80 w-9/16 bg-slate-900 p-10 m-10">
                    <h1 className="text-3xl font-bold mb-4">
                      {wellcome?.title}
                    </h1>
                    <p className="text-base mb-8">{wellcome?.text}</p>
                    <p className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline">
                      Start her!
                    </p>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="flex flex-col">
                <h2 className="text-xl">Betting siderne</h2>
                <form
                  onSubmit={(e) => newBettingSide(e)}
                  className="flex flex-col w-1/2 justify-center m-auto mb-10"
                >
                  <label>Titel</label>
                  <input
                    className="text-black"
                    defaultValue={betSites?.title}
                    type="text"
                    name="title"
                    onChange={(e) =>
                      setBetSites({ ...betSites, title: e.target.value })
                    }
                  />
                  <label>tekst</label>
                  <input
                    className="text-black"
                    defaultValue={betSites?.text}
                    type="text"
                    name="text"
                    onChange={(e) =>
                      setBetSites({ ...betSites, text: e.target.value })
                    }
                  />
                  <button type="submit" className="bg-slate-600 w-1/6 mt-5">
                    Opdater
                  </button>
                </form>
                <div className="bg-slate-500">
                  <div className="h-90 w-9/16 bg-slate-900 p-10 m-10">
                    <h1 className="text-3xl font-bold mb-4">
                      {betSites?.title}
                    </h1>
                    <p className="text-base mb-8">{betSites?.text}</p>
                    <div>
                      {sites.map((site) => {
                        return (
                          <div>
                            <input type="checkbox" />

                            <label> {site}</label>
                          </div>
                        );
                      })}
                    </div>
                    <br />
                    <p className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline">
                      Videre
                    </p>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}
