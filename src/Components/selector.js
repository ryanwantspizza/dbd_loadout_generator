import React, { useState, useEffect } from "react";
import { states } from "../states";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  initIndexDb,
  insertData,
  clearObjectStore,
  getAllData,
} from "../Utilities/indexDb";
import { PerksSelector } from "./perksSelector";
import { AddOnsSelector } from "./addOnsSelector";

function Selector({
  id,
  selectionType,
  optionsState,
  addOnsState,
  emptyAllowed,
  emptyAddOnAllowed,
  role,
}) {
  const [message, setMessage] = useState("");
  const [currentSelectedPerks, setCurrentSelectedPerks] = useRecoilState(
    role === "killer"
      ? states.currentlySelectedKillerPerks
      : states.currentlySelectedSurvivorPerks
  );
  const [currentlySelectedKillerOrItem, setCurrentlySelectedKillerOrItem] = useRecoilState(
    role === "killer"
        ? states.currentlySelectedKiller
        : states.currentlySelectedItem
  )
  const options = useRecoilValue(optionsState);
  const addOnOptions = useRecoilValue(addOnsState);
  const allowedOptions = options.filter((o) => o.allowed);
  const allowedAddOns = addOnOptions.filter((a) => a.allowed);
  const empty = useRecoilValue(emptyAllowed);
  const [indexDb, setIndexDb] = useState(null);
  let additionalOption = empty ? 1 : 0;
  let additionalAddOnOption = emptyAddOnAllowed ? 1 : 0;
  let addOnStore =
    id === "killersCurrentSelection"
      ? "killerAddOnsCurrentSelection"
      : "survivorItemAddOnsCurrentSelection";

  useEffect(() => {
    initIndexDb().then((indexDbInstance) => {
      setIndexDb(indexDbInstance);
      getAllData(indexDbInstance, id).then((results) => {
        if (!results) {
          return;
        } else if (
          id === "killersCurrentSelection" ||
          id === "survivorItemsCurrentSelection"
        ) {
          getAllData(indexDbInstance, addOnStore).then((addOnResults) => {
            let killerOrItem = {
                killerOrItem: results[0],
                addOns: addOnResults,
            }
            setCurrentlySelectedKillerOrItem(killerOrItem);
          });
        } else if (id.includes("Perks")) {
          let savedPerks = [];
          results.forEach((perk) => {
            savedPerks.push(perk);
          });
          setCurrentSelectedPerks(savedPerks);
        } else {
          const messageToReturn = results.length > 0 ? results[0].name : "";
          setMessage(messageToReturn);
        }
      });
    });
  }, []);

  function handleClickEvent() {
    clearObjectStore(indexDb, id).then(() => {
      if (selectionType === "Killer" || selectionType === "Item") {
        clearObjectStore(indexDb, addOnStore).then(() => {
          handleSelectionWithAddOns();
        });
      } else if (selectionType === "Perks") {
        handlePerkSelection();
      } else if (allowedOptions.length > 0) {
        handleSingleSelection();
      } else {
        setMessage(`No ${selectionType.toLowerCase()} selected`);
      }
    });
  }

  function handlePerkSelection() {
    let newChosenPerks = [];
    let alreadyChosen = [];
    let numberOfPerksToChooseFrom =
      allowedOptions.length < 4 ? allowedOptions.length : 4;

    for (let i = 0; i < numberOfPerksToChooseFrom; i++) {
      let randomNumber;
      do {
        randomNumber = Math.floor(
          Math.random() * (allowedOptions.length + additionalOption)
        );
      } while (alreadyChosen.includes(allowedOptions[randomNumber]?.id));
      if (randomNumber !== allowedOptions.length) {
        newChosenPerks.push(allowedOptions[randomNumber]);
        alreadyChosen.push(allowedOptions[randomNumber]?.id);
        insertData(indexDb, id, {
          id: allowedOptions[randomNumber].id,
          name: allowedOptions[randomNumber].name,
        });
      }
    }
    setCurrentSelectedPerks(newChosenPerks);
  }

  function handleSingleSelection() {
    let selection;
    let randomNumber = Math.floor(
      Math.random() * (allowedOptions.length + additionalOption)
    );
    if (randomNumber !== allowedOptions.length) {
      selection = allowedOptions[randomNumber];
    } else {
      selection = { name: `No ${selectionType.toLowerCase(0)}` };
    }
    insertData(indexDb, id, { id: selection.id, name: selection.name });
    setMessage(selection.name);
  }

  function handleAddOnSelection(applicableAddOns) {
    let chosenAddOns = [];
    let alreadyChosenIds = [];
    let numberOfAddOnsToChooseFrom =
      applicableAddOns.length < 2 ? applicableAddOns.length : 2;

    for (let i = 0; i < numberOfAddOnsToChooseFrom; i++) {
      let randomNumber;
      do {
        randomNumber = Math.floor(
          Math.random() * (applicableAddOns.length + additionalAddOnOption)
        );
      } while (alreadyChosenIds.includes(randomNumber));
      if (randomNumber !== applicableAddOns.length) {
        chosenAddOns.push(applicableAddOns[randomNumber]);
        alreadyChosenIds.push(randomNumber);
      }
    }
    chosenAddOns.forEach((addOn) => {
      insertData(indexDb, addOnStore, { id: addOn.id, name: addOn.name });
    });
    return chosenAddOns;
  }

  function handleSelectionWithAddOns() {
    let selection;
    let chosenAddOns;
    if (allowedOptions.length > 0) {
      let randomNumber = Math.floor(
        Math.random() * (allowedOptions.length + additionalOption)
      );
      if (randomNumber !== allowedOptions.length) {
        selection = allowedOptions[randomNumber];
        insertData(indexDb, id, { id: selection.id, name: selection.name });
      }
    }

    if (selection) {
      let selection_id =
        selectionType === "Killer" ? selection.id : selection.item_type_id;
      let applicableAddOns = getApplicableAddOns(allowedAddOns, selection_id);
      chosenAddOns = handleAddOnSelection(applicableAddOns);
      let killerOrItem = {
        killerOrItem: selection,
        addOns: chosenAddOns,
      }
      setCurrentlySelectedKillerOrItem(killerOrItem);
    } else {
      setMessage(`No ${selectionType.toLowerCase()}`);
    }
  }

  function getApplicableAddOns(addOns, selection_id) {
    if (selectionType === "Killer") {
      return addOns.filter((addOn) => addOn.killer_id === selection_id);
    } else {
      return addOns.filter((addOn) => addOn.item_type_id === selection_id);
    }
  }

  function determineComponent() {
    if ((selectionType === "Killer" || selectionType === "Item") && Object.keys(currentlySelectedKillerOrItem).length > 0) {
      return (
        <AddOnsSelector
          indexDb={indexDb}
          tableId={addOnStore}
          role={role}
        />
      );
    } else if (selectionType === "Perks" && currentSelectedPerks.length > 0) {
      return (
        <PerksSelector
          optionsState={optionsState}
          indexDb={indexDb}
          tableId={id}
          role={role}
        />
      );
    } else {
        return message
    }
  }

  return (
    <div>
      <button onClick={handleClickEvent}>{`Get ${selectionType}`}</button>
      <div>
        {determineComponent()}
      </div>
    </div>
  );
}

export { Selector };
