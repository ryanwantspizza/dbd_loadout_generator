import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { states } from "../states";
import { insertData, deleteData } from "../Utilities/indexDb";

// This component renders a table of perks for a selected role and allows refreshing them.
// Props:
// - optionsState: The Recoil state for the list of available perks.
// - indexDb: The IndexedDB instance for database operations.
// - tableId: The ID of the table in the database.
// - role: Specifies whether the role is 'killer' or 'survivor'.

function PerksSelector({ optionsState, indexDb, tableId, role }) {
  const [currentSelectedPerks, setCurrentSelectedPerks] = useRecoilState(
    role === "killer"
      ? states.currentlySelectedKillerPerks
      : states.currentlySelectedSurvivorPerks
  );
  const options = useRecoilValue(optionsState);
  const allowedOptions = options.filter((o) => o?.allowed); // Defensive check for undefined options

  // Function: handleRefresh
  // Refreshes a specific perk for the selected role by replacing it with a random applicable perk.
  function handleRefresh(index, perkId) {
    if (!currentSelectedPerks || !allowedOptions || allowedOptions.length === 0) {
      console.warn("No perks or allowed options available for refresh.");
      return;
    }

    const alreadyChosen = currentSelectedPerks.map((perk) => perk?.id).filter(Boolean); // Defensive check for undefined perks
    console.log(`alreadyChosen ${alreadyChosen}`);
    let randomNumber;

    if (alreadyChosen.length === allowedOptions.length) {
      console.warn("All allowed options are already chosen.");
      return;
    } else {
      do {
        randomNumber = Math.floor(Math.random() * allowedOptions.length);
        console.log(randomNumber);
      } while (alreadyChosen.includes(allowedOptions[randomNumber]?.id)); // Defensive check for undefined IDs

      const newPerk = allowedOptions[randomNumber];
      if (!newPerk) {
        console.error("Failed to find a valid perk for refresh.");
        return;
      }

      deleteData(indexDb, tableId, perkId).then(() => {
        insertData(indexDb, tableId, {
          id: newPerk.id,
          name: newPerk.name,
        }).then(() => {
          setCurrentSelectedPerks((previousPerkStates) => {
            const newPerkStates = [...previousPerkStates];
            newPerkStates[index] = newPerk;
            return newPerkStates;
          });
        });
      });
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Perk</th>
            <th>Refresh</th>
          </tr>
        </thead>
        <tbody>
          {currentSelectedPerks?.map((perk, index) => (
            <tr key={index}>
              <td>{perk?.name || "Unknown Perk"}</td> {/* Defensive check for undefined perk name */}
              <td>
                <button onClick={() => handleRefresh(index, perk?.id)}>
                  Refresh
                </button>
              </td>
            </tr>
          )) || (
            <tr>
              <td colSpan="2">No perks selected.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export { PerksSelector };
