import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { states } from "../states";
import { insertData, deleteData } from "../Utilities/indexDb";

function AddOnsSelector({ indexDb, tableId, role }) {
  const [currentlySelectedKillerOrItem, setCurrentlySelectedKillerOrItem] = useRecoilState(
    role === "killer"
        ? states.currentlySelectedKiller
        : states.currentlySelectedItem
  );
  const allowedAddOns = useRecoilValue(
    role === "killer"
      ? states.killerAddOnsState
      : states.survivorItemAddOnsState
  );

  const applicableAddOns = 
    role === "killer"
      ? allowedAddOns.filter((addOn) => addOn.killer_id === currentlySelectedKillerOrItem.killerOrItem.id)
      : allowedAddOns.filter((addOn) => addOn.item_id === currentlySelectedKillerOrItem.killerOrItem.id);
  
  function handleRefresh(index, addOnId) {
    const alreadyChosen = currentlySelectedKillerOrItem.addOns.map((addOn) => addOn.id);
    let randomNumber;
    if (alreadyChosen.length === applicableAddOns.length) {
      return;
    } else {
      do {
        randomNumber = Math.floor(Math.random() * applicableAddOns.length);
      } while (alreadyChosen.includes(applicableAddOns[randomNumber].id));
      deleteData(indexDb, tableId, addOnId).then(() => {
        const newAddOn = applicableAddOns[randomNumber];
        insertData(indexDb, tableId, {
          id: newAddOn.id,
          name: newAddOn.name,
        }).then(() => {
          setCurrentlySelectedKillerOrItem((previousKillerOrItemState) => {
            const newAddOns = [...previousKillerOrItemState.addOns];
            newAddOns[index] = applicableAddOns[randomNumber];
            const newKillerOrItemState = {
              ...previousKillerOrItemState,
              addOns: newAddOns,
            }
            return newKillerOrItemState;
          });
        });
      });
    }
  }

  return (
    <div>
      <p>{currentlySelectedKillerOrItem.killerOrItem.name}</p>
      <table>
        <thead>
          <tr>
            <th>Add-On</th>
            <th>Refresh</th>
          </tr>
        </thead>
        <tbody>
          {currentlySelectedKillerOrItem.addOns.map((addOn, index) => (
            <tr key={index}>
              <td>{addOn.name}</td>
              <td>
                <button onClick={() => handleRefresh(index, addOn.id)}>
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

export { AddOnsSelector };
