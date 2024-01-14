import React, { useEffect, useState } from "react";
import { readRemoteFile } from "react-papaparse";
import { Checkbox } from "./checkbox";
import { useRecoilState } from 'recoil';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

function List({ id, listState, emptyAllowedState, listUrl, type }) {
    const [list, setList] = useRecoilState(listState)
    const [emptyAllowed, setEmptyAllowed] = useRecoilState(emptyAllowedState)
    const [displayState, setDisplayState] = useState(false)

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
        <Accordion>
          <Accordion.Item eventKey="0">
          <Accordion.Header>{`Filter ${type}`}</Accordion.Header>
          <Accordion.Body>
          {renderEmptyToggle()}
          <button onClick={() => handleClick(true)}>Select All</button>
          <button onClick={() => handleClick(false)}>Unselect All</button>
          {list.map((item) => {
            return(
                <Checkbox key={item.id} item={item} listState={listState}/>
            ) 
          })}
          </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )
};

export { List };