import React, { useEffect } from "react";
import { readRemoteFile } from "react-papaparse";
import { Trait } from "./trait";
import { useRecoilState } from 'recoil';
import { survivorPerkTraitsState } from '../states';

const survPerkTraitUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4W3mqgNZMO0dVt-8zx1H4R9I1tcvo6P66Im5U-QQTSmxhECopKzGbgxvlPdZRyUZGA-tiFihhgfne/pub?gid=728899707&single=true&output=csv'

function TraitList() {
    const [traits, setTraits] = useRecoilState(survivorPerkTraitsState)

    useEffect(() => {
      readRemoteFile(survPerkTraitUrl, {
        header: true,
        complete: (results) => {
          setTraits(results.data)
        }
    });    
    }, []);

    function handleClick(selectAll) {
      const newTraitsState = traits.map(trait => {
        return {
          ...trait,
          allowed: selectAll
        };
      });
      setTraits(newTraitsState);
    }

    return(
      <div >
        <button onClick={() => handleClick(true)}>Select All</button>
        <button onClick={() => handleClick(false)}>Unselect All</button>
        {traits.map((trait) => {
          return(
              <Trait key={trait.id} trait={trait} />
          ) 
        })}
      </div>
    )
  }

  export { TraitList };