import './App.css';
import React, {useState, useEffect} from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const traitCategories = [
  {
    id: 1,
    name: 'Information',
    allowed: true
  },
  {
    id: 2,
    name: "Second chance",
    allowed: true
  },
  {
    id: 3,
    name: "Inflicts Exhaustion",
    allowed: true
  },
  {
    id: 4,
    name: "Requires activation",
    allowed: true
  },
  {
    id: 5,
    name: "Killer nerf",
    allowed: true
  }
]

const traits = [
  {
    id: 1,
    name: "Grants Endurance",
    allowed: true,
    categories: [2]
  },
  {
    id: 2,
    name: "Inflicts Exhaustion",
    allowed: true,
    categories: [3]
  },
  {
    id: 3,
    name: "Activates on being unhooked",
    allowed: true,
    categories: [4]
  },
  {
    id: 4,
    name: "Reveals killer's aura",
    allowed: true,
    categories: [1]
  },
  {
    id: 5,
    name: "Reveals teammates' auras",
    allowed: true,
    categories: [1]
  },
  {
    id: 6,
    name: "Sabotages hooks",
    allowed: true,
    categories: [5]
  },
  {
    id: 7,
    name: "Reveals hook auras",
    allowed: true,
    categories: [1]
  }
]

const perks = [
  {
    id: 1,
    name: 'Dead Hard',
    allowed: true,
    traits: [1, 2, 3]
  },
  {
    id: 2,
    name: "Kindred",
    allowed: true,
    traits: [4,5]
  },
  {
    id: 3,
    name: "Lithe",
    allowed: true,
    traits: [2]
  },
  {
    id: 4,
    name: "Bond",
    allowed: true,
    traits: [5]
  },
  {
    id: 5,
    name: "Saboteur",
    allowed: true,
    traits: [6,7]
  }
]

/* Logic for setting the exclusion of a category, trait, and perk.

When a category's allowed status is changed, this change in state should always be reflected by 
child traits and grandchild perks, and when a trait's allowed status changes this should 
always be reflected by child perks.

*/





function App() {

  const [allowedPerks, setAllowedPerks] = useState(perks)
  const [allowedTraits, setAllowedTraits] = useState(traits)
  const [allowedTraitCategories, setAllowedTraitCategories] = useState(traitCategories)

  function figureOutTraitState(trait, allowedPerks, setAllowedTraits) {
    const traitPerks = allowedPerks.filter((perk) => {
      perk.traits.includes(trait.id)
    })

  }

  function figureOutPerkCategoryState() {

  }

  function Perk({perk, allowedPerks, setAllowedPerks}) {
    const [allowed, setAllowed] = useState(perk.allowed)

    function handleClickEvent() {
      const newState = !allowed
      let perkToUpdate = allowedPerks.find(p => p.id === perk.id)

      perkToUpdate.allowed = newState
      setAllowed(newState)
      setAllowedPerks(allowedPerks)
      setAllowedTraits()
    }

    return (
      <div>
        <input type="checkbox" id={perk.id} checked={allowed} onChange={handleClickEvent}/>
        <label htmlFor={perk.id}>{perk.name}</label>
      </div>
    )
  }
  

  return (
    <div>
      {perks.map((perk) => {
        return (
          <Perk key={perk.id} perk={perk} allowedPerks={allowedPerks} setAllowedPerks={setAllowedPerks}  />
        ) 
      })}
    </div>
  )

}

export default App;
