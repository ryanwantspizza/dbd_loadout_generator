import React from 'react';
import { useRecoilState } from 'recoil';
import { updateData } from '../Utilities/indexDb';
import { states } from "../states";

function Checkbox({ item, listState, db }) {
    const [list, setList] = useRecoilState(listState);
    let targetItem = list.find(i => i.id === item.id);
    let allowed = targetItem.allowed
    const newState = !allowed
    const indexDb = db;

    function handleClickEvent() {
        const updatedItem = {
        ...targetItem,
        allowed: newState
        };
        setList(currentState => {
            const updatedItems = currentState.map(i => (i.id === item.id ? updatedItem : i));
            return updatedItems;
        });

        if (!indexDb) {
            console.log("Db not initialized")
        }
        if (!updatedItem.allowed) {
            console.log(indexDb)
            updateData(indexDb, "notAllowed", updatedItem).then(() => {
                console.log("Data updated")
            })
        }
        // Add logic to update parent and children items
    }

    return (
        <div>
            <input type="checkbox" id={item.id} checked={allowed} onChange={handleClickEvent}/>
            <label htmlFor={item.id}>{item.name}</label>
        </div>
    )
}

export { Checkbox };