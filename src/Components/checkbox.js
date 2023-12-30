import React from 'react';
import { useRecoilState } from 'recoil';

function Checkbox({ item, listState }) {
    const [list, setList] = useRecoilState(listState);
    let itemStateToUpdate = list.find(i => i.id === item.id);
    let allowed = itemStateToUpdate.allowed
    const newState = !allowed

    function handleClickEvent() {
        const updatedItemState = {
        ...itemStateToUpdate,
        allowed: newState
        };
        setList(currentState => {
        const updatedItems = currentState.map(i => (i.id === item.id ? updatedItemState : i));
        return updatedItems;
        });
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