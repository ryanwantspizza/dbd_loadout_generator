import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { survivorPerksState, allowEmptySurvivorPerk } from '../states'

function BuildGenerator() {
    const [chosenPerks, setChosenPerks] = useState([]);
    const allPerks = useRecoilValue(survivorPerksState);
    const currentAllowedPerks = allPerks.filter(p => p.allowed);
    let addEmptySlot = useRecoilValue(allowEmptySurvivorPerk) ? 1 : 0

    function handleClickEvent() {
      setChosenPerks([])
      let newChosenPerks = []
      let alreadyChosen = []
      let numberOfPerksToChooseFrom = currentAllowedPerks.length < 4 ? currentAllowedPerks.length : 4

      for (let i = 0; i < numberOfPerksToChooseFrom ; i++) {
        let randomNumber;
        do {
          randomNumber = Math.floor(Math.random() * (currentAllowedPerks.length + addEmptySlot));
        } while (alreadyChosen.includes(randomNumber))
        if (randomNumber !== currentAllowedPerks.length) {
          newChosenPerks.push(currentAllowedPerks[randomNumber].name)
          alreadyChosen.push(randomNumber)
        } else {
          newChosenPerks.push("No perk")
        }
      }
      setChosenPerks(newChosenPerks)
    }

    return (
      <div>
        <button onClick={handleClickEvent}>Get Perks</button>
        <p>{chosenPerks[0] || ' - '}, {chosenPerks[1] || ' - '}, {chosenPerks[2] || ' - '}, {chosenPerks[3] || ' - '}</p>
      </div>
    )
  }

  export { BuildGenerator };