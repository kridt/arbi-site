import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CustomerList() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [archived, setArchived] = useState([]);

  useEffect(() => {
    if (auth?.currentUser) {
      setUser(auth?.currentUser);

      db.collection("admins")
        .doc(auth?.currentUser?.uid)
        .collection("clients")
        .get()
        .then((querySnapshot) => {
          setClients(querySnapshot.docs);
        });

      db.collection("admins")
        .doc(auth?.currentUser?.uid)
        .collection("archived")
        .get()
        .then((querySnapshot) => {
          var archivedClients = [];

          querySnapshot?.docs?.forEach((doc) => {
            archivedClients.push(doc.data());
          });

          setArchived(archivedClients);
        });
    } else {
      console.log("no user");
      navigate("/login");
    }
  }, []);

  function deleteDocument(id, client) {
    if (window.confirm("Er du sikker på du vil akivere denne kunde?")) {
      db.collection("admins")
        .doc(user?.uid)
        .collection("clients")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          archiveDocument(id, client);
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }
  }

  function archiveDocument(id, client) {
    client.archived = true;
    client.archivedAt = new Date().toISOString();
    client.archivedBy = user?.uid;
    client.email = "not available";
    client.phone = "not available";
    client.name = "not available";

    db.collection("admins")
      .doc(user?.uid)
      .collection("archived")
      .add(client)
      .then(() => {
        console.log("Document successfully archived!");
        setArchived((archived) => [...archived, client]);

        setClients(clients.filter((client) => client.id !== id));
      });
  }

  function convertDate(date) {
    const oldFormat = date.split("-");
    const newFormat = oldFormat.reverse().join("-");
    return newFormat;
  }

  return (
    <div className="bg-slate-900 min-h-screen text-white flex">
      <div className="flex-1">
        <button
          className={
            "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-1"
          }
          onClick={() => {
            navigate("/admin");
          }}
        >
          Tilbage
        </button>
        <h1 className="text-4xl text-center mb-5">
          Her er den fulde liste over kunder
        </h1>

        <div>
          <h1>Sorter ud fra:</h1>
          {/* <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-1"
              onClick={() => sortClientsByDateOld()}
            >
              Dato (ældste først)
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-1"
              onClick={() => sortClientsByDateNew()}
            >
              Dato (nyeste først)
            </button>
          </div> */}
        </div>

        <p>Antal på listen: {clients?.length}</p>
        {clients?.map((client) => {
          const clientData = client?.data();
          var referral = clientData?.referal;

          if (referral === "") {
            referral = "Ingen Referral";
          }
          return (
            <div
              className="m-4 bg-slate-800 rounded-md flex justify-between p-5"
              key={client.id}
            >
              <div>
                <p>dato: {client?.data()?.dato}</p>
                <p>Navn: {client?.data()?.name}</p>
                <p>Tlf: {client?.data()?.phone}</p>
                <p>Email: {client?.data()?.email}</p>
                <p>Referral: {referral}</p>
                <p>oprettede sider: {client?.data()?.sites?.length}</p>
              </div>
              <div>
                <button
                  className={
                    "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-1"
                  }
                  onClick={() => {
                    deleteDocument(client.id, clientData);
                  }}
                >
                  Fjern og arkiver
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex-1">
        <br />
        <br />
        <h1 className="text-4xl text-center mb-5">
          Her er alle dine lukkede kunder
        </h1>
        <p>Sorter ud fra: </p>
        <p>Antal på listen: {archived?.length}</p>

        {archived?.map((client) => {
          console.log(client);
          var referral = client?.referal;
          if (referral === "") {
            referral = "Ingen Referral";
          }
          return (
            <div
              key={`${client?.dato + client?.admin + client?.archivedAt}`}
              className="m-4 bg-slate-800 rounded-md p-5"
            >
              <p>Kunde oprettet: {client?.dato}</p>
              <p>Kundens antal sider: {client?.sites.length}</p>
              <p>Referral: {referral}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
