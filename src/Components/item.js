import React from 'react';
import { useRecoilState } from 'recoil';
import { survivorItemsState } from '../states';

function Item({item}) {
    const [items, setItems] = useRecoilState(survivorItemsState);
    let itemStateToUpdate = items.find(p => p.id === item.id)
    let allowed = itemStateToUpdate.allowed
    const newState = !allowed

    function handleClickEvent() {
        const updatedItemState = {
        ...itemStateToUpdate,
        allowed: newState
        };
        setItems(currentState => {
        const updatedItems = currentState.map(i => (i.id === item.id ? updatedItemState : i));
        return updatedItems;
        });
        // if (newState === allowed) {
        //     updateParents
        // }
    }

    return (
        <div>
            <input type="checkbox" id={item.id} checked={allowed} onChange={handleClickEvent}/>
            <label htmlFor={item.id}>{item.name}</label>
        </div>
    )
}

export { Item };