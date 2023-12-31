import React, { useEffect } from "react";
import { readRemoteFile } from "react-papaparse";
import { Checkbox } from "./checkbox";
import { useRecoilState } from 'recoil';
import Form from 'react-bootstrap/Form';

function List({ id, listState, emptyAllowedState, listUrl }) {
    const [list, setList] = useRecoilState(listState)
    const [emptyAllowed, setEmptyAllowed] = useRecoilState(emptyAllowedState)

    useEffect(() => {
        readRemoteFile(listUrl, {
          header: true,
          complete: (results) => {
            let sortedResults = results.data.sort((a,b) => {
              if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
            })
            let filteredData = removeOppositeRoleOfferings(sortedResults);
            setList(filteredData);
          }
        });
      }, []);

      function removeOppositeRoleOfferings(data) {
        if (id === "survivorOfferings") {
          return data.filter(offering => offering.role !== "killer")
        } else if (id === "killerOfferings") {
          return data.filter(offering => offering.role !== "survivor")
        } else {
          return data;
        }
      }
    
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