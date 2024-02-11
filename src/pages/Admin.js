import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import YourSites from "../components/YourSites";

import YourCustomers from "../components/YourCustomers";
import AdminNav from "../components/AdminNav";
import TopNavAdmin from "../components/TopNavAdmin";
import ReferalChart from "../components/ReferalChart";
import MyRatings from "../components/MyRatings";

export default function Admin() {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(false);
  const [sites, setSitess] = useState([]);

  useEffect(() => {
    if (auth?.currentUser) {
      if (auth?.currentUser?.uid === "oupYxAriFzUIFZuECtrYisK7AgV2") {
        setOwner(true);
        db.collection("admins")
          .get()
          .then((querySnapshot) => {
            setSitess(querySnapshot.docs);
          });
      }
      setUser(auth?.currentUser);
      setLoading(false);
    } else {
      console.log("No user");
      navigate("/login");
    }
  }, [navigate, user]);

  async function createAdmin(e) {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    await auth?.createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user);
      db.collection("admins")
        .doc(user.user.uid)
        .set({
          email: user.user.email,
          uid: user.user.uid,
          sites: [
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
          ],
        })
        .then(() => {
          console.log("Document successfully written!");
          setLoading(false);
          auth?.signOut();
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      setLoading(false);
    });
  }

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
    <div className={"bg-slate-900 min-h-screen text-white flex"}>
      <div style={{ flex: "1" }}>
        <AdminNav />
      </div>
      <div
        style={{
          flex: "6",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TopNavAdmin link={auth?.currentUser?.uid} />
        <div>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex justify-center">
              <YourSites uid={auth?.currentUser?.uid} />
            </div>

            <div className="flex justify-center">
              <div className="bg-blue-900 w-80">
                <YourCustomers uid={auth?.currentUser?.uid} />
              </div>
            </div>
            <div className="flex justify-center">
              {/* <div className="bg-blue-900 w-80">
              <YourReferals uid={auth?.currentUser?.uid} />
            </div> */}
              <ReferalChart />
            </div>
            <div className="flex justify-center">
              {/* <div className="bg-blue-900 w-80">
              <YourReferals uid={auth?.currentUser?.uid} />
            </div> */}
              <MyRatings uid={auth?.currentUser?.uid} />
            </div>
          </div>

          <div>
            {owner ? (
              <div>
                {sites.map((site) => {
                  console.log(site);

                  return (
                    <div className="bg-blue-500 m-3 p-2  rounded">
                      <p>Email: {site.data().email}</p>
                      <p>Uid: {site.data().uid}</p>
                    </div>
                  );
                })}

                <form
                  onSubmit={(e) => createAdmin(e)}
                  className="mt-40 max-w-lg"
                >
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="text-black bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                  />
                  <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    className="text-black bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-2"
                  />
                  <input
                    type="submit"
                    value="Create Admin"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                  />
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
