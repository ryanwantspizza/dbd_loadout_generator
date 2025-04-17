import React from "react";
import { useRecoilValue, useRecoilState, selector } from "recoil";
import { states } from "../states";
import { insertData, deleteData } from "../Utilities/indexDb";

function PerksSelector({ optionsState, indexDb, tableId, role }) {
  const [currentSelectedPerks, setCurrentSelectedPerks] = useRecoilState(
    role === "killer"
      ? states.currentlySelectedKillerPerks
      : states.currentlySelectedSurvivorPerks
  );
  const options = useRecoilValue(optionsState);
  const allowedOptions = options.filter((o) => o.allowed);
  function handleRefresh(index, perkId) {
    const alreadyChosen = currentSelectedPerks.map((perk) => perk.id);
    console.log(`alreadyChosen ${alreadyChosen}`);
    let randomNumber;
    console.log(perkId);
    console.log(alreadyChosen);
    if (alreadyChosen.length === allowedOptions.length) {
      return;
    } else {
        do {
          randomNumber = Math.ceil(Math.random() * allowedOptions.length);
          console.log(randomNumber);
        } while (alreadyChosen.includes(randomNumber));
        setCurrentSelectedPerks((previousPerkStates) => {
          const newPerkStates = [...previousPerkStates];
          newPerkStates[index] = allowedOptions[randomNumber];
          deleteData(indexDb, tableId, perkId)
          insertData(indexDb, tableId, {
            id: allowedOptions[randomNumber].id,
            name: allowedOptions[randomNumber].name,
          });
          return newPerkStates;
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
          {currentSelectedPerks.map((perk, index) => (
            <tr key={index}>
              <td>{perk.name}</td>
              <td>
                <button onClick={() => handleRefresh(index, perk.id)}>
                  Refresh
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { PerksSelector };
