import React, { useEffect, useState } from "react";
import { readRemoteFile } from "react-papaparse";
import { Perk } from "./perk"
import { useRecoilState } from 'recoil';
import { survivorPerksState, allowEmptySurvivorPerk } from '../states';
import Form from 'react-bootstrap/Form';

const survPerkUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4W3mqgNZMO0dVt-8zx1H4R9I1tcvo6P66Im5U-QQTSmxhECopKzGbgxvlPdZRyUZGA-tiFihhgfne/pub?gid=435978149&single=true&output=csv'

function PerkList() {
    const [perks, setPerks] = useRecoilState(survivorPerksState)
    const [emptySlotAllowed, setEmptySlotAllowed] = useRecoilState(allowEmptySurvivorPerk)

    useEffect(() => {
      readRemoteFile(survPerkUrl, {
        header: true,
        complete: (results) => {
          setPerks(results.data);
        }
      });
    }, []);

    function handleEmptyToggle(event) {
      setEmptySlotAllowed(event.target.checked)
    }

    function handleClick(selectAll) {
      const newPerksState = perks.map(perk => {
        return {
          ...perk,
          allowed: selectAll
        };
      });

      setPerks(newPerksState)
    }

    return(
      <div >
        <Form>
        <div>
            <Form.Check
              onChange={(event) => handleEmptyToggle(event)}
              type="switch"
              id="empty-toggle"
              label="Allow Empty Perk Slots"
              checked={emptySlotAllowed}
            />
          </div>
          </Form>
        <button onClick={() => handleClick(true)}>Select All</button>
        <button onClick={() => handleClick(false)}>Unselect All</button>
        {perks.map((perk) => {
          return(
              <Perk key={perk.id} perk={perk} />
          ) 
        })}
      </div>
    )
  }

  export { PerkList };