import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";

export default function YourSites({ uid }) {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();

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

  function updateSites(e) {
    e.preventDefault();
    const sites = e.target.sites.value.split(",");

    db.collection("admins")
      .doc(uid)
      .update({
        sites: sites,
      })
      .then(() => {
        alert("Sider opdateret");
        navigate("/login");
        setOpenEdit(false);
      });
  }
  return (
    <div className="bg-blue-900 max-w-xs">
      {openEdit && (
        <div className="bg-black opacity-75 p-10  rounded-lg absolute left-0 top-0 right-0 bottom-0">
          <div className=" opacity-100 bg-blue-900 m-72">
            <p>Nuværende sider:</p>
            <div className="flex">
              {sites?.map((site) => (
                <p>{site + ", "}</p>
              ))}
            </div>
            <form onSubmit={(e) => updateSites(e)}>
              <textarea
                className="text-black"
                name="sites"
                id="sites"
                cols="100"
                rows="2"
                defaultValue={sites?.join(",")}
              ></textarea>
              <p>Separer med ,</p>
              <br />
              <button type="submit" className="text-white">
                Opdater sider
              </button>
            </form>
            <br />
            <br />
            <button
              className="text-white"
              onClick={() => setOpenEdit(!openEdit)}
            >
              Luk
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <h3>De sider dine kunder ser</h3>
        <button className="underline" onClick={() => setOpenEdit(!openEdit)}>
          Rediger sider
        </button>
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
