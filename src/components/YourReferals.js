import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function YourReferals({ uid }) {
  const [referals, setReferals] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    db.collection("admins")
      .doc(uid)
      .collection("referals")
      .get()
      .then((doc) => {
        console.log(doc.docs);
        setReferals(doc.docs);
      });
  }, []);

  function createNewReferal(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const referal = e.target.referal.value;

    db.collection("admins")
      .doc(uid)
      .collection("referals")
      .doc("referalId-" + referal)
      .set({
        name: name,
        email: email,
        phone: phone,
        referal: referal,
      })
      .then(() => {
        alert("Referal oprettet");
        setOpenEdit(false);
        navigate("/login");
      });
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl">Dine referals</h1>
        <button className="underline" onClick={() => setOpenEdit(!openEdit)}>
          Tilføj referal
        </button>
      </div>
      <p>Du har {referals?.length} referals</p>
      <div>
        {referals?.map((referal) => {
          return (
            <div
              key={referal.referal}
              className="bg-blue-500 m-3 rounded-lg mb-6"
            >
              <p>{referal.data().name}</p>
              <p>Email: {referal.data().email}</p>
              <p>Tlf: {referal.data().phone}</p>
              <p>Nummer: {referal.data().referal}</p>
            </div>
          );
        })}
      </div>
      {openEdit && (
        <>
          <div className="bg-black opacity-75 p-10  rounded-lg absolute left-0 top-0 right-0 bottom-0">
            <div className="opacity-100 bg-blue-900 m-72">
              <h1 className="text-center">opret ny referal</h1>

              <form onSubmit={(e) => createNewReferal(e)}>
                <div>
                  <input
                    className="text-black"
                    placeholder="Navn"
                    name="name"
                    type="text"
                  />
                </div>
                <br />
                <div>
                  <input
                    className="text-black"
                    placeholder="Email"
                    name="email"
                    type="text"
                  />
                </div>
                <br />
                <div>
                  <input
                    className="text-black"
                    placeholder="Telefon"
                    name="phone"
                    type="text"
                  />
                </div>
                <br />
                <input
                  className="text-black"
                  placeholder="referal nummer"
                  type="text"
                  name="referal"
                />
                <br />
                <button className="bg-blue-500 p-2 " type="submit">
                  opret
                </button>
              </form>
              <br />
              <button onClick={() => setOpenEdit(!openEdit)}>Luk vindue</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
