import React, { useState } from "react";
import { useRecoilValue } from 'recoil';
import { survivorItemsState, noItemAllowedState, survivorItemAddOnsState, noItemAddOnAllowedState } from '../states';

function ItemSelector() {
    const [chosenItem, setChosenItem] = useState("");
    const [chosenAddOns, setChosenAddOns] = useState([]);
    const [message, setMessage] = useState("");
    const allItems = useRecoilValue(survivorItemsState);
    const allAddOns = useRecoilValue(survivorItemAddOnsState);
    const currentAllowedItems = allItems.filter(i => i.allowed);
    let noItemAllowed = useRecoilValue(noItemAllowedState) ? 1 : 0;
    const currentAllowedAddOns = allAddOns.filter(a => a.allowed);
    let addEmptySlot = useRecoilValue(noItemAddOnAllowedState) ? 1 : 0

    function handleClick() {
        setChosenItem("");
        setChosenAddOns([]);
        let item = "";

        if (currentAllowedItems.length > 0) {
            let randomNumber = Math.floor(Math.random() * (currentAllowedItems.length + noItemAllowed));
            if (randomNumber !== currentAllowedItems.length) {
                item = currentAllowedItems[randomNumber]
                setChosenItem(item.name);
            }
        }

        let newChosenAddOns = [];
        if (item) {
            let applicableAddOns = currentAllowedAddOns.filter(a => a.item_type_id == item.item_type_id)
        console.log(applicableAddOns)

        
        let alreadyChosen = []
        let numberOfAddOnsToChooseFrom = applicableAddOns.length < 2 ? applicableAddOns.length : 2

        for (let i = 0; i < numberOfAddOnsToChooseFrom ; i++) {
            let randomNumber;
            do {
              randomNumber = Math.floor(Math.random() * (applicableAddOns.length + addEmptySlot));
            } while (alreadyChosen.includes(randomNumber))
            if (randomNumber !== applicableAddOns.length) {
              newChosenAddOns.push(applicableAddOns[randomNumber])
              alreadyChosen.push(randomNumber)
            } else {
                newChosenAddOns.push("Empty Slot")
            }
          }
          setChosenAddOns(newChosenAddOns)
        }

        handleMessage(item.name, newChosenAddOns)
    }


    function handleMessage(selectedItemName, selectedAddOns) {
        if (!selectedItemName) {
            setMessage("No item")
        } else {
           setMessage(`${selectedItemName} + ${selectedAddOns[0].name} & ${selectedAddOns[1].name}`)
        }
    }

    return(
        <div>
          <button onClick={handleClick}>Get Item</button>
          <p>{message}</p>
        </div>
      )
}

export { ItemSelector };