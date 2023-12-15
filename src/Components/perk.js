import React from 'react';
import { useRecoilState } from 'recoil';
import { survivorPerksState } from '../states';
function Perk({perk}) {
    const [perks, setPerks] = useRecoilState(survivorPerksState)
    let perkStateToUpdate = perks.find(p => p.id === perk.id)
    let allowed = perkStateToUpdate.allowed
    const newState = !allowed


    function handleClickEvent() {
        const updatedPerkState = {
        ...perkStateToUpdate,
        allowed: newState
        };
        setPerks(currentState => {
        const updatedPerks = currentState.map(p => (p.id === perk.id ? updatedPerkState : p));
        return updatedPerks;
        });
        // if (newState === allowed) {
        //     updateParents
        // }
    }

    return (
        <div>
            <input type="checkbox" id={perk.id} checked={allowed} onChange={handleClickEvent}/>
            <label htmlFor={perk.id}>{perk.name}</label>
        </div>
    )
}

export { Perk };