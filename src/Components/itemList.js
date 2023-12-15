import React, { useEffect } from "react";
import { readRemoteFile } from "react-papaparse";
import { Item } from "./item"
import { useRecoilState } from 'recoil';
import { survivorItemsState, noItemAllowedState } from '../states';
import Form from 'react-bootstrap/Form';

const survivorItemsUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4W3mqgNZMO0dVt-8zx1H4R9I1tcvo6P66Im5U-QQTSmxhECopKzGbgxvlPdZRyUZGA-tiFihhgfne/pub?gid=65561236&single=true&output=csv";

function ItemList() {
    const [items, setItems] = useRecoilState(survivorItemsState)
    const [noItemAllowed, setNoItemAllowed] = useRecoilState(noItemAllowedState)

    useEffect(() => {
        readRemoteFile(survivorItemsUrl, {
          header: true,
          complete: (results) => {
            setItems(results.data);
          }
        });
      }, []);
    
      function handleClick(selectAll) {
        const newItemsState = items.map(item => {
          return {
            ...item,
            allowed: selectAll
          };
        });
  
        setItems(newItemsState)
      }

      function handleEmptyToggle(event) {
        setNoItemAllowed(event.target.checked)
      }
    
      return(
        <div >
            <Form>
        <div>
            <Form.Check
              onChange={(event) => handleEmptyToggle(event)}
              type="switch"
              id="empty-toggle"
              label="Allow No Item"
              checked={noItemAllowed}
            />
          </div>
          </Form>
          <button onClick={() => handleClick(true)}>Select All</button>
          <button onClick={() => handleClick(false)}>Unselect All</button>
          {items.map((item) => {
            return(
                <Item key={item.id} item={item} />
            ) 
          })}
        </div>
      )
};

export { ItemList };