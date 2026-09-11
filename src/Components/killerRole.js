import React from "react";
import { Selector } from './selector';
import { List } from "./list"
import { states } from '../states';
import { urls } from "../urls"

// This component renders the UI for the killer role, including selectors and lists for killers, perks, offerings, and add-ons.
function KillerRole() {
    return(
        <div className="role">
          <section className="section">
            <h2 className="section__title">Generate a build</h2>
            <div className="card-grid">
              <Selector
                id={"killersCurrentSelection"}
                selectionType={"Killer"}
                optionsState={states.killersState}
                addOnsState={states.killerAddOnsState}
                emptyAllowed={states.defaultEmptyAllowedState}
                emptyAddOnAllowed={states.noKillerAddOnAllowedState}
                role={"killer"}
              />
              <Selector id={"killerPerksCurrentSelection"} selectionType={"Perks"} optionsState={states.killerPerksState} addOnsState={states.killerAddOnsState} emptyAllowed={states.allowEmptyKillerPerkSlot} role={"killer"}/>
              <Selector id={"killerOfferingsCurrentSelection"} selectionType={"Offering"} optionsState={states.killerOfferingsState} addOnsState={states.killerAddOnsState} emptyAllowed={states.noKillerOfferingAllowedState} role={"killer"}/>
            </div>
          </section>
          <section className="section">
            <h2 className="section__title">Refine the pool</h2>
            <div className="card-grid card-grid--filter">
              <List filter={"Killers"} id={"killers"} listState={states.killersState} emptyAllowedState={states.defaultEmptyAllowedState} listUrl={urls.killers}/>
              <List filter={"Perks"} id={"killerPerks"} listState={states.killerPerksState} emptyAllowedState={states.allowEmptyKillerPerkSlot} listUrl={urls.killerPerks}/>
              <List filter={"Offerings"} id={"killerOfferings"} listState={states.killerOfferingsState} emptyAllowedState={states.noKillerOfferingAllowedState} listUrl={urls.offerings}/>
              <List filter={"Add Ons"} id={"killerAddOns"} listState={states.killerAddOnsState} emptyAllowedState={states.noKillerAddOnAllowedState} listUrl={urls.killerAddOns}/>
            </div>
          </section>
        </div>
      )

}

export { KillerRole };