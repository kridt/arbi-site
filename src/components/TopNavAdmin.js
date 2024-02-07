import React, { useState } from "react";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import { Tooltip } from "@mui/material";

export default function TopNavAdmin({ link }) {
  const [copy, setCopy] = useState(false);

  const copyTextToClipboard = async () => {
    if ("clipboard" in navigator) {
      try {
        await navigator.clipboard.writeText(
          "https://arbiweb.vercel.app/" + link
        );
        setCopy(true);
      } catch (err) {
        alert("Fejl ved kopiering til udklipsholderen", err);
      }
    } else {
      // Clipboard API er ikke tilgængelig
      alert("Clipboard API er ikke tilgængeligt i din browser.");
    }
  };

  return (
    <nav className="bg-sejLogoFarve h-14 flex justify-evenly">
      <div className="flex items-center">
        <h1>Dit personlige link:</h1>
        <a
          target="_blank"
          rel="noreferrer"
          href={"https://arbiweb.vercel.app/" + link}
        >
          https://arbiweb.vercel.app/{link}
        </a>
        <Tooltip title={copy ? "Kopieret" : "Kopier"}>
          <button onClick={copyTextToClipboard}>
            <ContentPasteGoIcon />
          </button>
        </Tooltip>
      </div>
    </nav>
  );
}
