import React, { useState } from "react";
import { useRecoilValue } from 'recoil';
import { killersState } from '../states';

function KillerSelector() {
    const [chosenKiller, setchosenKiller] = useState("");
    const allKillers = useRecoilValue(killersState);
    const currentAllowedKillers = allKillers.filter(k => k.allowed);

    function handleClick() {
      setchosenKiller("");
      if (currentAllowedKillers.length > 0) {
        let randomNumber = Math.floor(Math.random() * currentAllowedKillers.length);
        setchosenKiller(currentAllowedKillers[randomNumber].name)
      } else {
        setchosenKiller("No killer selected")
      }
      
    }

    return(
      <div>
        <button onClick={handleClick}>Get Killer</button>
        <p>{chosenKiller}</p>
      </div>
    )

}

export { KillerSelector };