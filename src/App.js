import './App.css';
import React, { useState, useEffect } from "react";
import { RecoilRoot } from 'recoil';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SurvivorRole } from './Components/survivorRole';
import { KillerRole } from './Components/killerRole';
import { useWakeLock } from './Hooks/useWakeLock';

function App() {
  const [showSurvivorSection, setShowSurvivorSection] = useState(() => {
    const savedRole = localStorage.getItem("survivorRole")
    return savedRole ? JSON.parse(savedRole) : true
  });

  const [keepScreenAwake, setKeepScreenAwake] = useState(() => {
    const savedPreference = localStorage.getItem("keepScreenAwake")
    return savedPreference ? JSON.parse(savedPreference) : true
  });

  const { supported: wakeLockSupported } = useWakeLock(keepScreenAwake);

  useEffect(() => {
    localStorage.setItem("survivorRole",  showSurvivorSection)
  }, [showSurvivorSection])

  useEffect(() => {
    localStorage.setItem("keepScreenAwake", keepScreenAwake)
  }, [keepScreenAwake])

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
          {wakeLockSupported && (
            <div className='keep-awake-selection'>
              <Form.Check
                onChange={(event) => setKeepScreenAwake(event.target.checked)}
                type="switch"
                id="keep-screen-awake-toggle"
                label="Keep screen awake"
                checked={keepScreenAwake}
              />
            </div>
          )}
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
