import React, { useEffect } from "react";
import { readRemoteFile } from "react-papaparse";
import { Survivor } from "./survivor"
import { useRecoilState } from 'recoil';
import { survivorsState } from '../states';

const surivorUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4W3mqgNZMO0dVt-8zx1H4R9I1tcvo6P66Im5U-QQTSmxhECopKzGbgxvlPdZRyUZGA-tiFihhgfne/pub?gid=2090851778&single=true&output=csv'

function SurvivorList() {
    const [survivors, setSurvivors] = useRecoilState(survivorsState)

    useEffect(() => {
      readRemoteFile(surivorUrl, {
        header: true,
        complete: (results) => {
            setSurvivors(results.data)
        }
    });
    }, []);

    function handleClick(selectAll) {
      const newSurvivorsState = survivors.map(survivor => {
        return {
          ...survivor,
          allowed: selectAll
        };
      });
      setSurvivors(newSurvivorsState);
    }

      return(
        <div >
          <button onClick={() => handleClick(true)}>Select All</button>
          <button onClick={() => handleClick(false)}>Unselect All</button>
          {survivors.map((survivor) => {
            return(
                <Survivor key={survivor.id} survivor={survivor} />
            ) 
          })}
        </div>
      )
  }

  export { SurvivorList };