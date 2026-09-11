import React from "react";
import { List } from "./list"
import { states } from '../states';
import { urls } from "../urls"
import { Selector } from "./selector";

// This component renders the UI for the survivor role, including selectors and lists for survivors, perks, items, and offerings.
function SurvivorRole() {

    return(
      <div className="role">
        <section className="section">
          <h2 className="section__title">Generate a build</h2>
          <div className="card-grid">
            <Selector id={"survivorsCurrentSelection"} selectionType={"Survivor"} optionsState={states.survivorsState} addOnsState={states.survivorItemAddOnsState} emptyAllowed={states.defaultEmptyAllowedState}/>
            <Selector id={"survivorPerksCurrentSelection"} selectionType={"Perks"} optionsState={states.survivorPerksState} addOnsState={states.survivorItemAddOnsState} emptyAllowed={states.allowEmptySurvivorPerk}/>
            <Selector id={"survivorItemsCurrentSelection"} selectionType={"Item"} optionsState={states.survivorItemsState} addOnsState={states.survivorItemAddOnsState} emptyAllowed={states.noItemAllowedState} emptyAddOnAllowed={states.noItemAddOnAllowedState}/>
            <Selector id={"survivorOfferingsCurrentSelection"} selectionType={"Offering"} optionsState={states.survivorOfferingsState} addOnsState={states.survivorItemAddOnsState} emptyAllowed={states.noSurvivorOfferingAllowedState}/>
          </div>
        </section>
        <section className="section">
          <h2 className="section__title">Refine the pool</h2>
          <div className="card-grid card-grid--filter">
            <List filter={"Survivors"} id={"survivors"} listState={states.survivorsState} emptyAllowedState={states.defaultEmptyAllowedState} listUrl={urls.surivors}/>
            <List filter={"Perks"} id={"survivorPerks"} listState={states.survivorPerksState} emptyAllowedState={states.allowEmptySurvivorPerk} listUrl={urls.survivorPerks}/>
            <List filter={"Items"} id={"survivorItems"} listState={states.survivorItemsState} emptyAllowedState={states.noItemAllowedState} listUrl={urls.survivorItems}/>
            <List filter={"Item Add Ons"} id={"survivorItemAddOns"} listState={states.survivorItemAddOnsState} emptyAllowedState={states.noItemAddOnAllowedState} listUrl={urls.survivorItemAddOns}/>
            <List filter={"Offerings"} id={"survivorOfferings"} listState={states.survivorOfferingsState} emptyAllowedState={states.noSurvivorOfferingAllowedState} listUrl={urls.offerings}/>
          </div>
        </section>
      </div>
    )
}

export { SurvivorRole };