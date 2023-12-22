import React from 'react';
import { useRecoilState } from 'recoil';
import { survivorItemAddOnsState } from '../states';

function ItemAddOn({addOn}) {
    const [itemAddOns, setItemAddOns] = useRecoilState(survivorItemAddOnsState);
    let addOnStateToUpdate = itemAddOns.find(a => a.id === addOn.id)
    let allowed = addOnStateToUpdate.allowed
    const newState = !allowed

    function handleClickEvent() {
        const updatedAddOnState = {
        ...addOnStateToUpdate,
        allowed: newState
        };
        setItemAddOns(currentState => {
        const updatedAddOns = currentState.map(a => (a.id === addOn.id ? updatedAddOnState : a));
        return updatedAddOns;
        });
        // if (newState === allowed) {
        //     updateParents
        // }
    }

    return (
        <div>
            <input type="checkbox" id={addOn.id} checked={allowed} onChange={handleClickEvent}/>
            <label htmlFor={addOn.id}>{addOn.name}</label>
        </div>
    )
    
};

export { ItemAddOn };