import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { List } from "./list"
import { states } from '../states';
import { urls } from "../urls"
import { Selector } from "./selector";

// This component renders the UI for the survivor role, including selectors and lists for survivors, perks, items, and offerings.
function SurvivorRole() {

    return(
      <div>
        <Container>
          <Row>
            <Col><Selector id={"survivorsCurrentSelection"} selectionType={"Survivor"} optionsState={states.survivorsState} addOnsState={states.survivorItemAddOnsState} emptyAllowed={states.defaultEmptyAllowedState}/></Col>
            <Col><Selector id={"survivorPerksCurrentSelection"} selectionType={"Perks"} optionsState={states.survivorPerksState} addOnsState={states.survivorItemAddOnsState} emptyAllowed={states.allowEmptySurvivorPerk}/></Col>
            <Col><Selector id={"survivorItemsCurrentSelection"} selectionType={"Item"} optionsState={states.survivorItemsState} addOnsState={states.survivorItemAddOnsState} emptyAllowed={states.noItemAllowedState} emptyAddOnAllowed={states.noItemAddOnAllowedState}/></Col>
            <Col><Selector id={"survivorOfferingsCurrentSelection"} selectionType={"Offering"} optionsState={states.survivorOfferingsState} addOnsState={states.survivorItemAddOnsState} emptyAllowed={states.noSurvivorOfferingAllowedState}/></Col>
          </Row>
          <Row>
            <Col><List filter={"Survivors"} id={"survivors"} listState={states.survivorsState} emptyAllowedState={states.defaultEmptyAllowedState} listUrl={urls.surivors}/></Col>
            <Col><List filter={"Perks"} id={"survivorPerks"} listState={states.survivorPerksState} emptyAllowedState={states.allowEmptySurvivorPerk} listUrl={urls.survivorPerks}/></Col>
            {/* <Col><List type={"Perk Traits"} id={"survivorPerkTraits"} listState={states.survivorPerkTraitsState} emptyAllowed={states.defaultemptyAllowed} listUrl={urls.survivorPerkTraits}/></Col> */}
            <Col><List filter={"Items"} id={"survivorItems"} listState={states.survivorItemsState} emptyAllowedState={states.noItemAllowedState} listUrl={urls.survivorItems}/></Col>
            <Col><List filter={"Item Add Ons"} id={"survivorItemAddOns"} listState={states.survivorItemAddOnsState} emptyAllowedState={states.noItemAddOnAllowedState} listUrl={urls.survivorItemAddOns}/></Col>
            <Col><List filter={"Offerings"} id={"survivorOfferings"} listState={states.survivorOfferingsState} emptyAllowedState={states.noSurvivorOfferingAllowedState} listUrl={urls.offerings}/></Col>
          </Row>
        </Container>
      </div>
    )
}

export { SurvivorRole };