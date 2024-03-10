import React from "react";

export default function MyRatings({ uid }) {
  async function copyLink() {
    var copyText = `https://arbiweb.vercel.app/rateMe/${uid}`;

    try {
      await navigator.clipboard.writeText(copyText);
      alert("Link kopieret!");
    } catch (err) {
      alert("Kunne ikke kopiere linket");
    }
  }

  return (
    <div>
      <p>
        Kopier dit rateMe link:{" "}
        <span className="underline cursor-pointer" onClick={() => copyLink()}>
          Her!
        </span>
      </p>

      <h1 className="text-center">MyRatings</h1>
    </div>
  );
}
