import React, { useState } from "react";
import { useRecoilValue } from 'recoil';
import { survivorItemsState, noItemAllowedState } from '../states';

function ItemSelector() {
    const [chosenItem, setChosenItem] = useState("");
    const allItems = useRecoilValue(survivorItemsState);
    const currentAllowedItems = allItems.filter(i => i.allowed);
    let noItemAllowed = useRecoilValue(noItemAllowedState) ? 1 : 0;

    function handleClick() {
        setChosenItem("");
        if (currentAllowedItems.length > 0) {
            let randomNumber = Math.floor(Math.random() * (currentAllowedItems.length + noItemAllowed));
            if (randomNumber !== currentAllowedItems.length) {
                setChosenItem(currentAllowedItems[randomNumber].name);
            } else {
                setChosenItem("No item")
            }
        } else {
            setChosenItem("No item selected");
        }
        
    }

    return(
        <div>
          <button onClick={handleClick}>Get Item</button>
          <p>{chosenItem}</p>
        </div>
      )
}

export { ItemSelector };