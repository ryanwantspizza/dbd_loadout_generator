import React, { useEffect } from "react";
import { useRecoilState } from 'recoil';
import { survivorItemAddOnsState, noItemAddOnAllowedState } from '../states';
import { ItemAddOn } from './itemAddOn'
import { readRemoteFile } from "react-papaparse";
import Form from 'react-bootstrap/Form';

const survivorItemAddOnsUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4W3mqgNZMO0dVt-8zx1H4R9I1tcvo6P66Im5U-QQTSmxhECopKzGbgxvlPdZRyUZGA-tiFihhgfne/pub?gid=1119670981&single=true&output=csv"

function ItemAddOnList() {
    const [itemAddOns, setItemAddOns] = useRecoilState(survivorItemAddOnsState)
    const [noItemAddOnAllowed, setNoItemAddOnAllowed] = useRecoilState(noItemAddOnAllowedState)

    useEffect(() => {
        readRemoteFile(survivorItemAddOnsUrl, {
          header: true,
          complete: (results) => {
            setItemAddOns(results.data);
          }
        });
      }, []);
    
      function handleClick(selectAll) {
        const newItemAddOnState = itemAddOns.map(addOn => {
          return {
            ...addOn,
            allowed: selectAll
          };
        });
  
        setItemAddOns(newItemAddOnState)
      }

      function handleEmptyToggle(event) {
        setNoItemAddOnAllowed(event.target.checked)
      }

      return(
        <div >
            <Form>
        <div>
            <Form.Check
              onChange={(event) => handleEmptyToggle(event)}
              type="switch"
              id="empty-toggle"
              label="Allow Empty Add On Slot"
              checked={noItemAddOnAllowed}
            />
          </div>
          </Form>
          <button onClick={() => handleClick(true)}>Select All</button>
          <button onClick={() => handleClick(false)}>Unselect All</button>
          {itemAddOns.map((addOn) => {
            return(
                <ItemAddOn key={addOn.id} addOn={addOn} />
            ) 
          })}
        </div>
      ) 
}

export { ItemAddOnList };