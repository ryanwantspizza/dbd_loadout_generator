import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect } from "react";
import { RecoilRoot } from 'recoil';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
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

  return (
    <RecoilRoot>
      <div className="app-shell">
        <header className="app-header">
          <p className="app-header__eyebrow">Dead by Daylight</p>
          <h1 className="app-header__title">Loadout Generator</h1>
          <p className="app-header__subtitle">
            Roll a semi-random build — then narrow the pool by allowing or
            disallowing individual perks, items, add-ons, and offerings.
          </p>
        </header>

        <div className="controls">
          <div className="role-switch" role="tablist" aria-label="Choose a role">
            <button
              type="button"
              role="tab"
              aria-selected={!showSurvivorSection}
              className={`role-switch__option${!showSurvivorSection ? ' is-active' : ''}`}
              onClick={() => setShowSurvivorSection(false)}
            >
              Killer
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={showSurvivorSection}
              className={`role-switch__option${showSurvivorSection ? ' is-active' : ''}`}
              onClick={() => setShowSurvivorSection(true)}
            >
              Survivor
            </button>
          </div>

          {wakeLockSupported && (
            <Form.Check
              className="keep-awake"
              onChange={(event) => setKeepScreenAwake(event.target.checked)}
              type="switch"
              id="keep-screen-awake-toggle"
              label="Keep screen awake"
              checked={keepScreenAwake}
            />
          )}
        </div>

        <Collapse in={!showSurvivorSection}>
          <div>
            <KillerRole />
          </div>
        </Collapse>
        <Collapse in={showSurvivorSection}>
          <div>
            <SurvivorRole />
          </div>
        </Collapse>
      </div>
    </RecoilRoot>
  )

}

export default App;
