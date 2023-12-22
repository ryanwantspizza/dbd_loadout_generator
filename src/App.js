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

function App() {
  
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
