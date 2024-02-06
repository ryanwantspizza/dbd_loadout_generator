import React, { useState, useEffect } from "react";
import { useRecoilValue } from 'recoil';
import { initIndexDb, insertData, deleteData, getData, getAllData  } from "../Utilities/indexDb";

function Selector({ id, selectionType, optionsState, addOnsState, emptyAllowed, emptyAddOnAllowed }) {
    const [message, setMessage] = useState("");
    const options = useRecoilValue(optionsState);
    const addOnOptions = useRecoilValue(addOnsState)
    const allowedOptions = options.filter(o => o.allowed);
    const allowedAddOns = addOnOptions.filter(a => a.allowed);
    const [indexDb, setIndexDb] = useState(null)
    let additionalOption = emptyAllowed ? 1 : 0;
    let additionalAddOnOption = emptyAddOnAllowed ? 1 : 0;
    const objectStore = `${id}CurrentSelection`

    useEffect(() => {
        initIndexDb().then(indexDbInstance => {
            setIndexDb(indexDbInstance)
            getAllData(indexDbInstance, objectStore).then(results => {
                if (selectionType === "Killer" && results) {
                    let killer = results[0];
                    getAllData(indexDbInstance, "killerAddOnsCurrentSelection").then(results => {
                        handleSelectionWithAddOnsMessage(killer, results)
                    })
                }
            })
            //continue filling in other selections with saved data
        })
    }, [])

    // Add DB stuff
    function handleClickEvent() {
        if (selectionType === "Killer" || selectionType === "Item") {
            //delete saved data
            handleSelectionWithAddOns()
        } else if (selectionType === "Perks") {
            handlePerkSelection()
        } else if (allowedOptions.length > 0) {
            handleSingleSelection()
        } else {
            setMessage(`No ${selectionType.toLowerCase()} selected`)
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
            selection = {name: `No ${selectionType.toLowerCase(0)}`};
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
        chosenAddOns.forEach(addOn => {
            let addOnStore = id === "killers" ? "killerAddOns" : "survivorItemAddOns"
            insertData(indexDb, `${addOnStore}CurrentSelection`, addOn)
        })
        return chosenAddOns
    }

    function handleSelectionWithAddOns() {
        let selection;
        let chosenAddOns;
        if (allowedOptions.length > 0) {
            let randomNumber = Math.floor(Math.random() * (allowedOptions.length + additionalOption));
            if (randomNumber !== allowedOptions.length) {
                selection = allowedOptions[randomNumber];
                insertData(indexDb, objectStore, selection)
            }
        }

        if (selection) {
            let selection_id = selectionType === "Killer" ? selection.id : selection.item_selection_id
            let applicableAddOns = getApplicableAddOns(allowedAddOns, selection_id)
            chosenAddOns = handleAddOnSelection(applicableAddOns)
            handleSelectionWithAddOnsMessage(selection, chosenAddOns)
        } else {
            setMessage(`No ${selectionType.toLowerCase()}`)
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
        if (selectionType === "Killer") {
            return addOns.filter(addOn => addOn.killer_id === selection_id)
        } else {
            return addOns.filter(addOn => addOn.item_selection_id === selection_id)
        }
    }

    return (
        <div>
          <button onClick={handleClickEvent}>{`Get ${selectionType}`}</button>
          <p>{message}</p>
        </div>
      )

}

export { Selector };