import React, { useState } from "react";
import { useRecoilValue } from 'recoil';

function Selector({ type, optionsState, addOnsState, emptyAllowed, emptyAddOnAllowed }) {
    const [message, setMessage] = useState("");
    const options = useRecoilValue(optionsState);
    const addOnOptions = useRecoilValue(addOnsState)
    const allowedOptions = options.filter(o => o.allowed);
    const allowedAddOns = addOnOptions.filter(a => a.allowed);
    let additionalOption = emptyAllowed ? 1 : 0;
    let additionalAddOnOption = emptyAddOnAllowed ? 1 : 0;
    function handleClickEvent() {
        if (type === "Killer" || type === "Item") {
            handleSelectionWithAddOns()
        } else if (type === "Perks") {
            handlePerkSelection()
        } else if (allowedOptions.length > 0) {
            handleSingleSelection()
        } else {
            setMessage(`No ${type.toLowerCase()} selected`)
        }
        
    }


    function handlePerkSelection() {
        let newChosenPerks = []
        let alreadyChosen = []
        let numberOfPerksToChooseFrom = allowedOptions.length < 4 ? allowedOptions.length : 4

      for (let i = 0; i < numberOfPerksToChooseFrom ; i++) {
        let randomNumber;
        do {
          randomNumber = Math.floor(Math.random() * (allowedOptions.length + additionalOption));
        } while (alreadyChosen.includes(randomNumber))
        if (randomNumber !== allowedOptions.length) {
          newChosenPerks.push(allowedOptions[randomNumber].name)
          alreadyChosen.push(randomNumber)
        }
      }
      handlePerkMessage(newChosenPerks)
    }


    function handlePerkMessage(selectedPerks) {
      setMessage(selectedPerks.join(", "));
    }


    function handleSingleSelection() {
        let selection;
        let randomNumber = Math.floor(Math.random() * (allowedOptions.length + additionalOption));
        if (randomNumber !== allowedOptions.length) {
            selection = allowedOptions[randomNumber];
        } else {
            selection = {name: `No ${type.toLowerCase(0)}`};
        }

        setMessage(selection.name)
        
    }


    function handleAddOnSelection(applicableAddOns) {
        let chosenAddOns = []
        let alreadyChosenIds = []
        let numberOfAddOnsToChooseFrom = applicableAddOns.length < 2 ? applicableAddOns.length : 2

        for (let i = 0; i < numberOfAddOnsToChooseFrom ; i++) {
            let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * (applicableAddOns.length + additionalAddOnOption));
            } while (alreadyChosenIds.includes(randomNumber))
            if (randomNumber !== applicableAddOns.length) {
                chosenAddOns.push(applicableAddOns[randomNumber])
                alreadyChosenIds.push(randomNumber)
            }
        }

        return chosenAddOns
    }

    function handleSelectionWithAddOns() {
        let selection;
        let chosenAddOns;
        if (allowedOptions.length > 0) {
            let randomNumber = Math.floor(Math.random() * (allowedOptions.length + additionalOption));
            if (randomNumber !== allowedOptions.length) {
                selection = allowedOptions[randomNumber];
            }
        }

        if (selection) {
            let applicableAddOns = getApplicableAddOns(allowedAddOns, selection.item_type_id)
            chosenAddOns = handleAddOnSelection(applicableAddOns)
            handleSelectionWithAddOnsMessage(selection, chosenAddOns)
        } else {
            setMessage(`No ${type.toLowerCase()}`)
        }

    }

    function handleSelectionWithAddOnsMessage(selection, addOns) {
        if (addOns?.length === 2) {
            setMessage(`${selection.name} + ${addOns[0].name} & ${addOns[1].name}`)
        } else if (addOns?.length === 1) {
            console.log(addOns)
            setMessage(`${selection.name} + ${addOns[0].name}`)
        } else {
            setMessage(selection.name)
        }
    }

    function getApplicableAddOns(addOns, selection_id) {
        if (type === "Killer") {
            return addOns.filter(addOn => addOn.killer_id === selection_id)
        } else {
            return addOns.filter(addOn => addOn.item_type_id === selection_id)
        }
    }

    return (
        <div>
          <button onClick={handleClickEvent}>{`Get ${type}`}</button>
          <p>{message}</p>
        </div>
      )

}

export { Selector };