import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import TopNavAdmin from "../components/TopNavAdmin";
import AdminNav from "../components/AdminNav";
//import { DataGrid } from "@mui/x-data-grid";

export default function CustomerList() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [archived, setArchived] = useState([]);

  /* const myData = [
    {
      id: 1, // Unique identifier for each row
      name: "John Doe", // Corresponds to the 'name' field in the columns definition
      age: 30, // Corresponds to the 'age' field in the columns definition
      // You can include other fields based on your columns definition
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 25,
      // Additional fields...
    },
    // More rows...
  ];

  const columns = [
    { field: "id", headerName: "Oprettede Sider", width: 130 },
    { field: "name", headerName: "Navn", width: 150, sortable: true },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      sortable: true,
    },

    // Add more columns as needed...
  ]; */

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
        setArchived((archived) => [...archived, client]);

        setClients(clients.filter((client) => client.id !== id));
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
          <div className="flex-1">
            <h1 className="text-4xl text-center mb-5">
              Her er den fulde liste over kunder
            </h1>

            {/* <div className="text-white">
              <DataGrid
                style={{ color: "white", border: "none" }}
                rows={myData}
                columns={columns}
                pageSizeOptions={5}
              />
            </div> */}

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
              var sites = [];
              var birthDay = clientData?.age.split("-").reverse().join("-");
              console.log(client);
              if (clientData?.sites !== "clean") {
                sites = clientData?.sites;
              }
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
                    <p>Fødselsdag: {birthDay}</p>
                    <p>Email: {client?.data()?.email}</p>
                    <p>Referral: {referral}</p>
                    <p>oprettede sider: {sites?.length}</p>
                    <div>
                      {sites?.map((site) => {
                        return (
                          <div>
                            <p>{site}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-row-reverse">
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
                    <div>
                      <Link
                        to={`/makebet/${client.id}`}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-5 block"
                      >
                        Lav første bet
                      </Link>
                    </div>
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
              var referral = client?.referal;
              var sites = [];
              if (referral === "") {
                referral = "Ingen Referral";
              }
              if (client?.sites !== "clean") {
                sites = client?.sites;
              }
              return (
                <div
                  key={`${client?.dato + client?.admin + client?.archivedAt}`}
                  className="m-4 bg-slate-800 rounded-md p-5"
                >
                  <p>Kunde oprettet: {client?.dato}</p>
                  <p>Kundens antal sider: {sites?.length}</p>
                  <p>Referral: {referral}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
