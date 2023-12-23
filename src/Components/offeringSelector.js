import React, { useState } from "react";
import { useRecoilValue } from 'recoil';
import { survivorOfferingsState, noOfferingAllowedState } from '../states';

function OfferingSelector() {
    const [chosenOffering, setchosenOffering] = useState("");
    const [message, setMessage] = useState("");
    const allOfferings = useRecoilValue(survivorOfferingsState);
    const currentAllowedOfferings = allOfferings.filter(o => o.allowed);
    let noOfferingAllowed = useRecoilValue(noOfferingAllowedState) ? 1 : 0;

    function handleClick() {
        setchosenOffering("");
        let offering = "";

        if (currentAllowedOfferings.length > 0) {
            let randomNumber = Math.floor(Math.random() * (currentAllowedOfferings.length + noOfferingAllowed));
            if (randomNumber !== currentAllowedOfferings.length) {
                offering = currentAllowedOfferings[randomNumber]
                setchosenOffering(offering.name);
            }
        }

        handleMessage(offering.name)
    }


    function handleMessage(selectedOfferingName) {
        if (!selectedOfferingName) {
            setMessage("No offering")
        } else {
           setMessage(selectedOfferingName)
        }
    }

    return(
        <div>
          <button onClick={handleClick}>Get Offering</button>
          <p>{message}</p>
        </div>
      )
}

export { OfferingSelector };