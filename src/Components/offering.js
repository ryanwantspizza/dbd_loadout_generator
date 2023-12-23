import React from 'react';
import { useRecoilState } from 'recoil';
import { survivorOfferingsState } from '../states';

function Offering({offering}) {
    const [offerings, setOfferings] = useRecoilState(survivorOfferingsState);
    let offeringStateToUpdate = offerings.find(i => i.id === offering.id)
    let allowed = offeringStateToUpdate.allowed
    const newState = !allowed

    function handleClickEvent() {
        const updatedOfferingState = {
        ...offeringStateToUpdate,
        allowed: newState
        };
        setOfferings(currentState => {
        const updatedOfferings = currentState.map(i => (i.id === offering.id ? updatedOfferingState : i));
        return updatedOfferings;
        });
        // if (newState === allowed) {
        //     updateParents
        // }
    }

    return (
        <div>
            <input type="checkbox" id={offering.id} checked={allowed} onChange={handleClickEvent}/>
            <label htmlFor={offering.id}>{offering.name}</label>
        </div>
    )
}

export { Offering };