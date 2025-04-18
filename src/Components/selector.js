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
            handleSelectionWithAddOnsMessage(results[0], addOnResults);
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
      handleSelectionWithAddOnsMessage(selection, chosenAddOns);
    } else {
      setMessage(`No ${selectionType.toLowerCase()}`);
    }
  }

  function handleSelectionWithAddOnsMessage(selection, addOns) {
    if (addOns?.length === 2) {
      setMessage(`${selection.name} + ${addOns[0].name} & ${addOns[1].name}`);
    } else if (addOns?.length === 1) {
      setMessage(`${selection.name} + ${addOns[0].name}`);
    } else {
      setMessage("");
    }
  }

  function getApplicableAddOns(addOns, selection_id) {
    if (selectionType === "Killer") {
      return addOns.filter((addOn) => addOn.killer_id === selection_id);
    } else {
      return addOns.filter((addOn) => addOn.item_type_id === selection_id);
    }
  }

  return (
    <div>
      <button onClick={handleClickEvent}>{`Get ${selectionType}`}</button>
      <div>
        {selectionType === "Perks" ? (
          <PerksSelector
            optionsState={optionsState}
            indexDb={indexDb}
            tableId={id}
            role={role}
          />
        ) : (
          message
        )}
      </div>
    </div>
  );
}

export { Selector };
