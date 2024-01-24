import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

export default function YourSites({ uid }) {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    db.collection("admins")
      .doc(uid)
      .get()
      .then((doc) => {
        setSites(doc.data()?.sites);
      });
  }, [uid]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-blue-900 max-w-xs">
      <div className="flex justify-between">
        <h3>De sider dine kunder ser</h3>
        <Link className="underline" to="/admin/sites">
          Rediger sider
        </Link>
      </div>
      <button className="text-blue-500" onClick={toggleOpen}>
        {isOpen ? "Minimer" : "Vis"}
      </button>
      <Transition
        show={isOpen}
        enter="transition-opacity duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div>
          {loading && <p>Loading...</p>}
          <ul>
            {sites?.map((site) => (
              <li key={site}>{site}</li>
            ))}
          </ul>
        </div>
      </Transition>
    </div>
  );
}
