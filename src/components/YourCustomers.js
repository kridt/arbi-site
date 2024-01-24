import React, { useEffect, useState } from "react";
import { db } from "../firebase";

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
      <h1>Your Customers</h1>
      {customers?.map((customer) => {
        console.log(customer.data());
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
