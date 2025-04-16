import React, { useState } from "react";
import { useRecoilValue } from 'recoil';
import { insertData } from "../Utilities/indexDb";

function PerksSelector({ perks, optionsState, indexDb, dbId }) {
  const [perkStates, setPerkStates] = useState(perks);
  const options = useRecoilValue(optionsState);
  const allowedOptions = options.filter(o => o.allowed);
  function handleRefresh(index) {
    clearObjectStore(indexDb, id).then(() => {
      const alreadyChosen = perkStates.map(perk => perk.id);
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * allowedOptions.length);
      } while (alreadyChosen.includes(randomNumber))
      setPerkStates(previousPerkStates => {
        const newPerkStates = [...previousPerkStates];
        newPerkStates[index] = allowedOptions[randomNumber];
        insertData(indexDb, dbId, {id: allowedOptions[randomNumber].id, name: allowedOptions[randomNumber].name})
        return newPerkStates;
      });
    });
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
          {perks.map((perk, index) => (
            <tr key={index}>
              <td>{perk.name}</td>
              <td>
                <button onClick={() => handleRefresh(index)}>Refresh</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { PerksSelector };