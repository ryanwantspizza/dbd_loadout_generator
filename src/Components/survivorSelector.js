import React, { useState } from "react";
import { useRecoilValue } from 'recoil';
import { states } from '../states';

function SurvivorSelector() {
    const [chosenSurvivor, setChosenSurvivor] = useState("");
    const allSurvivors = useRecoilValue(states.survivorsState);
    const currentAllowedSurvivors = allSurvivors.filter(s => s.allowed);

    function handleClick() {
      setChosenSurvivor("");
      if (currentAllowedSurvivors.length > 0) {
        let randomNumber = Math.floor(Math.random() * currentAllowedSurvivors.length);
        setChosenSurvivor(currentAllowedSurvivors[randomNumber].name)
      } else {
        setChosenSurvivor("No survivor selected")
      }
      
    }

    return(
      <div>
        <button onClick={handleClick}>Get Survivor</button>
        <p>{chosenSurvivor}</p>
      </div>
    )
  }

  export { SurvivorSelector };