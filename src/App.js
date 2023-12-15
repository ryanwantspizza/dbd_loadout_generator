import './App.css';
import React, {useState, useEffect} from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable
} from 'recoil';
import { usePapaParse } from 'react-papaparse';
import ToggleButton from 'react-bootstrap/ToggleButton'
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SurvivorRole } from './Components/survivorRole';


const survPerkUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4W3mqgNZMO0dVt-8zx1H4R9I1tcvo6P66Im5U-QQTSmxhECopKzGbgxvlPdZRyUZGA-tiFihhgfne/pub?gid=435978149&single=true&output=csv'
const survPerkTraitUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4W3mqgNZMO0dVt-8zx1H4R9I1tcvo6P66Im5U-QQTSmxhECopKzGbgxvlPdZRyUZGA-tiFihhgfne/pub?gid=728899707&single=true&output=csv'
const surivorUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4W3mqgNZMO0dVt-8zx1H4R9I1tcvo6P66Im5U-QQTSmxhECopKzGbgxvlPdZRyUZGA-tiFihhgfne/pub?gid=2090851778&single=true&output=csv'
function App() {
  const [perks, setPerks] = useState([]);
  const [traits, setTraits] = useState([]);
  const [survivors, setSurvivors] = useState([]);
  const { readRemoteFile } = usePapaParse();

  useEffect(() => {
      readRemoteFile(survPerkUrl, {
        header: true,
        complete: (results) => {
          setPerks (results.data)
        }
      });
      readRemoteFile(survPerkTraitUrl, {
        header: true,
        complete: (results) => {
          setTraits (results.data)
        }
      });
      readRemoteFile(surivorUrl, {
        header: true,
        complete: (results) => {
          setSurvivors(results.data)
        }
      })
  }, []);


  const perksState = atom({
    key: 'perksState',
    default: perks
  });

  const traitsState = atom({
    key: 'traitsState',
    default: traits
  });

  const survivorsState = atom({
    key: 'survivorsState',
    default: survivors
  });

  function Perk({perk}) {
    const [perks, setPerks] = useRecoilState(perksState)
    let perkStateToUpdate = perks.find(p => p.id === perk.id)
    let allowed = perkStateToUpdate.allowed
    const newState = !allowed


    function handleClickEvent() {
      const updatedPerkState = {
        ...perkStateToUpdate,
        allowed: newState
      };
      setPerks(currentState => {
        const updatedPerks = currentState.map(p => (p.id === perk.id ? updatedPerkState : p));
        return updatedPerks;
      });
      if (newState === allowed) {
        // updateParents
      }
    }

    return (
      <div>
        <input type="checkbox" id={perk.id} checked={allowed} onChange={handleClickEvent}/>
        <label htmlFor={perk.id}>{perk.name}</label>
      </div>
    )
  }

  function Trait({trait}) {
    const [traits, setTraits] = useRecoilState(traitsState)
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
      if (newState === allowed) {
        //enableParents()
      } else {
        //disableChildren()
      }
    }

    return (
      <div>
        <input type="checkbox" id={trait.id} checked={allowed} onChange={handleClickEvent}/>
        <label htmlFor={trait.id}>{trait.description}</label>
      </div>
    )
  }

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

  function BuildGenerator() {
    const [chosenPerks, setChosenPerks] = useState([]);
    const allPerks = useRecoilValue(perksState);
    const currentAllowedPerks = allPerks.filter(p => p.allowed);

    function handleClickEvent() {
      setChosenPerks([])
      let newChosenPerks = []
      let alreadyChosen = []
      let numberOfPerksToChooseFrom = currentAllowedPerks.length < 4 ? currentAllowedPerks.length : 4
      for (let i = 0; i < numberOfPerksToChooseFrom ; i++) {
        let randomNumber;
        do {
          randomNumber = Math.floor(Math.random() * currentAllowedPerks.length);
        } while (alreadyChosen.includes(randomNumber))
        newChosenPerks.push(currentAllowedPerks[randomNumber].name)
        alreadyChosen.push(randomNumber)
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

  function PerkList() {
    const [perks, setPerks] = useRecoilState(perksState)

    function handleClick(selectAll) {
      const newPerksState = perks.map(perk => {
        return {
          ...perk,
          allowed: selectAll
        };
      });

      setPerks(newPerksState)
    }

    return(
      <div >
        <button onClick={() => handleClick(true)}>Select All</button>
        <button onClick={() => handleClick(false)}>Unselect All</button>
        {perks.map((perk) => {
          return(
              <Perk key={perk.id} perk={perk} />
          ) 
        })}
      </div>
    )
  }

  function TraitList() {
    const [traits, setTraits] = useRecoilState(traitsState)

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

  function SurvivorList() {
    const [survivors, setSurvivors] = useRecoilState(survivorsState)

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

  function SurvivorSelector() {
    const [chosenSurvivor, setChosenSurvivor] = useState("");
    const allSurvivors = useRecoilValue(survivorsState);
    const currentAllowedSurvivors = allSurvivors.filter(s => s.allowed);

    function handleClick() {
      setChosenSurvivor("");
      let randomNumber = Math.floor(Math.random() * currentAllowedSurvivors.length);
      setChosenSurvivor(currentAllowedSurvivors[randomNumber].name)
    }

    return(
      <div>
        <button onClick={handleClick}>Get Survivor</button>
        <p>{chosenSurvivor}</p>
      </div>
    )
  }

  function Survivors() {
    return(
      <div>
        <Container>
          <Row>
            <Col><SurvivorSelector/></Col>
            <Col><BuildGenerator/></Col>
          </Row>
          <Row>
            <Col><SurvivorList/></Col>
            <Col><PerkList/></Col>
            <Col><TraitList/></Col>
          </Row>
        </Container>
      </div>
    )
  }

  function Killers() {
    return(
      <div>
        <p>WIP</p>
      </div>
    )
  }

  const [showSurvivorSection, setShowSurvivorSection] = useState(true);

  function handleToggle(event) {
    setShowSurvivorSection(event.target.checked);
  }

  return (
    <div>
      <RecoilRoot>
        <Form>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '0.5rem' }}>Killers</span>
            <Form.Check
              onChange={(event) => handleToggle(event)}
              type="switch"
              id="kiler-or-survivor-toggle"
              label="Survivors"
              checked={showSurvivorSection}
            />
          </div>
          </Form>
        <Collapse in={!showSurvivorSection}>
          <div>
            <Killers/>
          </div>
      </Collapse>
        <Collapse in={showSurvivorSection}>
          <div>
            <SurvivorRole/>
          </div>
        </Collapse>
      </RecoilRoot>
    </div>
  )

}

export default App;
