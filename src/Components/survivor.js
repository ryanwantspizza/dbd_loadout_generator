import React from 'react';
import { useRecoilState } from 'recoil';
import { survivorsState } from '../states'

function Survivor({survivor}) {
    const [survivors  , setSurvivors] = useRecoilState(survivorsState)
    let survivorStateToUpdate = survivors.find(s => s.id === survivor.id)
    let allowed = survivorStateToUpdate.allowed
    const newState = !allowed


    function handleClickEvent() {
      const updatedSurvivorState = {
        ...survivorStateToUpdate,
        allowed: newState
      };
      setSurvivors(currentState => {
        const updatedSurvivors = currentState.map(s => (s.id === survivor.id ? updatedSurvivorState : s));
        return updatedSurvivors;
      });
    }

    return (
      <div>
        <input type="checkbox" id={survivor.id} checked={allowed} onChange={handleClickEvent}/>
        <label htmlFor={survivor.id}>{survivor.name}</label>
      </div>
    )

  }

  export { Survivor };