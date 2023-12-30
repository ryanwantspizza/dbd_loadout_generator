import React, { useEffect } from "react";
import { readRemoteFile } from "react-papaparse";
import { Checkbox } from "./checkbox";
import { useRecoilState } from 'recoil';
import Form from 'react-bootstrap/Form';

function List({ listState, emptyAllowedState, listUrl }) {
    const [list, setList] = useRecoilState(listState)
    const [emptyAllowed, setEmptyAllowed] = useRecoilState(emptyAllowedState)

    useEffect(() => {
        readRemoteFile(listUrl, {
          header: true,
          complete: (results) => {
            setList(results.data);
          }
        });
      }, []);
    
      function handleClick(selectAll) {
        const newListState = list.map(item => {
          return {
            ...item,
            allowed: selectAll
          };
        });
  
        setList(newListState)
      }

      function handleEmptyToggle(event) {
        setEmptyAllowed(event.target.checked)
      }

      function renderEmptyToggle() {
        if (emptyAllowed !== "not allowed") {
          return(
            <Form>
              <div>
                <Form.Check
                  onChange={(event) => handleEmptyToggle(event)}
                  type="switch"
                  id="empty-toggle"
                  label="Allow Empty Slot"
                  checked={emptyAllowed}
                />
              </div>
          </Form>
          )
        }
      }
    
      return(
        <div >
          {renderEmptyToggle()}
          <button onClick={() => handleClick(true)}>Select All</button>
          <button onClick={() => handleClick(false)}>Unselect All</button>
          {list.map((item) => {
            return(
                <Checkbox key={item.id} item={item} listState={listState}/>
            ) 
          })}
        </div>
      )
};

export { List };