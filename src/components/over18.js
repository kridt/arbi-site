import React from "react";

const AgeRestrictedDateInput = () => {
  // Beregner datoen for en person, der er nøjagtigt 18 år gammel
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  // Funktion til håndtering af datavalidering
  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);

    if (selectedDate > minDate) {
      // Håndter her, hvad der skal ske, hvis personen ikke er over 18 år gammel
      // fx vis en fejlbesked eller nulstil datoen
      console.log("Du skal være mindst 18 år gammel.");
    } else {
      // Håndterer valgte dato, hvis personen er over 18 år gammel
      console.log("Valgt dato:", selectedDate);
    }
  };

  return (
    <div className="mb-4">
      <p>
        Vælg din fødselsdato (Det skal lige siges, du skal være fyldt 18 år)
      </p>
      <input
        type="date"
        onChange={handleDateChange}
        max={minDate.toISOString().split("T")[0]}
        className="w-full border border-gray-300 rounded-md py-2 px-4 text-black"
        name="age"
      />
    </div>
  );
};

export default AgeRestrictedDateInput;
