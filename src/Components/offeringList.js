import React, { useEffect, useState } from "react";
import { readRemoteFile } from "react-papaparse";
import { Perk } from "./perk"
import { useRecoilState } from 'recoil';
import { survivorOfferingsState, noOfferingAllowedState } from '../states';
import Form from 'react-bootstrap/Form';
import { orderResultsByName } from "../helpers"
import { Offering } from "./offering"

const offeringsUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4W3mqgNZMO0dVt-8zx1H4R9I1tcvo6P66Im5U-QQTSmxhECopKzGbgxvlPdZRyUZGA-tiFihhgfne/pub?gid=1403627140&single=true&output=csv"

function OfferingList() {
    const [offerings, setOfferings] = useRecoilState(survivorOfferingsState)
    const [emptySlotAllowed, setEmptySlotAllowed] = useRecoilState(noOfferingAllowedState)

    useEffect(() => {
      readRemoteFile(offeringsUrl, {
        header: true,
        complete: (results) => {
            let survivorOfferings = results.data.filter(o => o.role === 'both' || o.role === 'survivor');
            setOfferings(orderResultsByName(survivorOfferings));
        }
      });
    }, []);

    function handleEmptyToggle(event) {
      setEmptySlotAllowed(event.target.checked)
    }

    function handleClick(selectAll) {
      const newsurvivorOfferingsState = offerings.map(offering => {
        return {
          ...offering,
          allowed: selectAll
        };
      });

      setOfferings(newsurvivorOfferingsState)
    }

    return(
      <div >
        <Form>
        <div>
            <Form.Check
              onChange={(event) => handleEmptyToggle(event)}
              type="switch"
              id="empty-toggle"
              label="Allow Empty Offering Slot"
              checked={emptySlotAllowed}
            />
          </div>
          </Form>
        <button onClick={() => handleClick(true)}>Select All</button>
        <button onClick={() => handleClick(false)}>Unselect All</button>
        {offerings.map((offering) => {
          return(
              <Offering key={offering.id} offering={offering} />
          ) 
        })}
      </div>
    )
  }

  export { OfferingList };