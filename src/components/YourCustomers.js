import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function YourCustomers({ uid }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    db.collection("admins")
      .doc(uid)
      .collection("clients")
      .get()
      .then((querySnapshot) => {
        setCustomers(querySnapshot.docs);
      });
  }, [uid]);

  return (
    <div>
      <div className="flex justify-between">
        <h1>Dine Kunder</h1>
        <Link className="underline" to="/kundeliste">
          Gå til kundeliste
        </Link>
      </div>
      <p>Du har {customers?.length} kunder på i kø</p>

      {customers?.map((customer) => {
        return (
          <div className="m-4 bg-slate-800 rounded-md" key={customer.id}>
            <p>dato: {customer?.data()?.dato}</p>
            <p>{customer?.data()?.name}</p>
            <p>{customer?.data()?.phone}</p>
            <p>{customer?.data()?.email}</p>
            <p>oprettede sider: {customer?.data()?.sites?.length}</p>
          </div>
        );
      })}
    </div>
  );
}
