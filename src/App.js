import './App.css';
import React, { useState, useEffect } from "react";
import { RecoilRoot } from 'recoil';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SurvivorRole } from './Components/survivorRole';
import { KillerRole } from './Components/killerRole';

function App() {
  const [showSurvivorSection, setShowSurvivorSection] = useState(() => {
    const savedRole = localStorage.getItem("survivorRole")
    return savedRole ? JSON.parse(savedRole) : true
  });

  useEffect(() => {
    localStorage.setItem("survivorRole",  showSurvivorSection)
  }, [showSurvivorSection])

  useEffect(() => {
    document.body.classList.toggle('select-survivors', showSurvivorSection);
    document.body.classList.toggle('select-killers', !showSurvivorSection);
  }, [showSurvivorSection]);

  function handleToggle(event) {
    setShowSurvivorSection(event.target.checked);
  }

  return (
    <div>
      <RecoilRoot>
        <Form>
        <div className='killer-survivor-selection' style={{ display: 'flex', justifyContent: 'center' }}>
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
            <KillerRole/>
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
