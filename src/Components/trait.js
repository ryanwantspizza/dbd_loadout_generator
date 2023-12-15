import React from 'react';
import { useRecoilState } from 'recoil';
import { survivorPerkTraitsState } from '../states'

function Trait({trait}) {
    const [traits, setTraits] = useRecoilState(survivorPerkTraitsState)
    let traitStateToUpdate = traits.find(t => t.id === trait.id)
    let allowed = traitStateToUpdate.allowed
    const newState = !allowed


    function handleClickEvent() {
      const updatedTraitState = {
        ...traitStateToUpdate,
        allowed: newState
      };
      setTraits(currentState => {
        const updatedTraits = currentState.map(t => (t.id === trait.id ? updatedTraitState : t));
        return updatedTraits;
      });
    //   if (newState === allowed) {
    //     enableParents()
    //   } else {
    //     disableChildren()
    //   }
    }

    return (
        <div>
          <input type="checkbox" id={trait.id} checked={allowed} onChange={handleClickEvent}/>
          <label htmlFor={trait.id}>{trait.description}</label>
        </div>
      )
}

export { Trait };