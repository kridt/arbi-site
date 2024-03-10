import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import TopNavAdmin from "../components/TopNavAdmin";
import { auth, db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { findMoney } from "../components/FindMoney";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function MakeBet() {
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [combination, setCombination] = useState([]);
  const [playableSites, setPlayableSites] = useState([]);
  const [play, setPlay] = useState(0);
  const { id } = useParams();
  const [oddsList, setOddsList] = useState([]);

  useEffect(() => {
    if (auth?.currentUser) {
      db.collection("admins")
        .doc(auth?.currentUser?.uid)
        .collection("clients")
        .doc(id)
        .get()
        .then((doc1) => {
          if (doc1.exists) {
            setCustomer(doc1.data());
            setLoading(false);

            db.collection("admins")
              .doc(auth?.currentUser?.uid)
              .get()
              .then((doc) => {
                var nyListe = doc?.data()?.sites.filter((site) => {
                  return !doc1.data()?.sites?.includes(site);
                });

                setPlayableSites(nyListe);
              });
          } else {
            console.log("No such document!");
            alert("der er sket en fejl, prøv igen senere");
          }
        });
    } else {
      navigate("/login");
    }
  }, []);

  async function makeBet(e) {
    e.preventDefault();
    setLoading(true);
    var odds = [];
    playableSites?.map((site) => {
      const money = findMoney(site);

      odds.push({
        siteName: site,
        homeWin: Math.round(
          parseFloat(e.target[site + "home"].value.replace(",", ".")) * money
        ),
        draw: Math.round(
          parseFloat(e.target[site + "draw"].value.replace(",", ".")) * money
        ),
        awayWin: Math.round(
          parseFloat(e.target[site + "away"].value.replace(",", ".")) * money
        ),
        money: money,
      });
    });

    /* const oddsHome = e.target.oddsHome.value.replace(",", ".");
    const oddsDraw = e.target.oddsDraw.value.replace(",", ".");
    const oddsAway = e.target.oddsAway.value.replace(",", "."); */

    await axios
      .get("https://makebetserver.onrender.com/api/bet", {
        params: {
          customer: customer,
          data: odds,
        },
      })
      .then((res) => {
        setCombination(res.data.message.best_combination);
        setPlay(res.data.message.max_return);
        setOddsList(odds);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Der er sket en fejl, prøv igen senere");
        setLoading(false);
      });
  }

  return (
    <div className="text-white flex">
      <div style={{ flex: "1" }}>
        <AdminNav />
      </div>
      <div style={{ flex: "6" }}>
        <TopNavAdmin link={auth?.currentUser?.uid} />
        <div className="bg-slate-900 min-h-screen text-white flex">
          <div>
            <h1 className="mt-5">Lav et bet </h1>

            <div className="flex">
              <form onSubmit={(e) => makeBet(e)}>
                <div>
                  <label htmlFor="odds">Her vælger du odds for kampen</label>
                  <div>
                    {playableSites?.map((site) => {
                      return (
                        <div className="flex justify-between pb-2 mb-2 border-b-2">
                          <p>{site}</p>
                          <div className="flex justify-evenly ml-4">
                            <input
                              type="text"
                              /* onChange for at gemme odds */
                              id={site + "home"}
                              name={site + "home"}
                              placeholder="1"
                              required
                              style={{ width: "50px" }}
                              className="mr-3 text-center text-black"
                            />
                            <input
                              type="text"
                              id={site + "draw"}
                              name={site + "draw"}
                              placeholder="x"
                              required
                              style={{ width: "50px" }}
                              className="text-center mr-3 text-black"
                            />
                            <input
                              type="text"
                              id={site + "away"}
                              name={site + "away"}
                              placeholder="2"
                              required
                              style={{ width: "50px" }}
                              className="text-center text-black"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <input
                  className="text-white bg-green-500 mt-2 p-2"
                  type="submit"
                  //disabled={loading}
                  value={"Lav mit bet"}
                />
              </form>

              <div className="ml-80">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ color: "white" }}>
                              Bookmaker
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                              Indsats
                            </TableCell>

                            <TableCell align="right" sx={{ color: "white" }}>
                              Hjemmehold
                            </TableCell>
                            <TableCell align="right" sx={{ color: "white" }}>
                              Uafgjort
                            </TableCell>
                            <TableCell align="right" sx={{ color: "white" }}>
                              Ude
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {playableSites?.map((site, index) => {
                            let dataOnThisSite = {
                              index: index,
                              site: site,
                              money: findMoney(site),
                              winner: null,
                            };

                            if (combination[index] === "2") {
                              dataOnThisSite.winner = "away";
                            }

                            if (combination[index] === "1") {
                              dataOnThisSite.winner = "home";
                            }
                            if (combination[index] === "X") {
                              dataOnThisSite.winner = "draw";
                            }

                            return (
                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell sx={{ color: "white" }}>
                                  {site}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{ color: "white" }}
                                >
                                  {findMoney(site)} kr
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{ color: "white" }}
                                >
                                  {dataOnThisSite.winner === "home" ? (
                                    <>{oddsList[index]?.homeWin}</>
                                  ) : (
                                    ""
                                  )}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{ color: "white" }}
                                >
                                  {dataOnThisSite.winner === "draw" ? (
                                    <>{oddsList[index]?.draw}</>
                                  ) : (
                                    ""
                                  )}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{ color: "white" }}
                                >
                                  {dataOnThisSite.winner === "away" ? (
                                    <>{oddsList[index]?.awayWin}</>
                                  ) : (
                                    ""
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}

                          {/* <TableRow>
                            <TableCell sx={{ color: "white" }}>
                              Samlet
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ color: "white" }}
                            ></TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>
                              Hjemmehold
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>
                              Uafgjort
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white" }}>
                              ude
                            </TableCell>
                          </TableRow> */}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <p>Det skulle minimum give: {play}kr tilbage</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
