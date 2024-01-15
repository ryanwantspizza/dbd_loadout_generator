import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { SurvivorSelector } from './survivorSelector';
import { BuildGenerator } from './buildGenerator';
import { ItemSelector } from "./itemSelector";
import { SurvivorOfferingSelector } from "./survivorOfferingSelector"
import { List } from "./list"
import { states } from '../states';
import { urls } from "../urls"
import { Selector } from "./selector";

function SurvivorRole() {

    return(
      <div>
        <Container>
          <Row>
            <Col><Selector type={"Survivor"} optionsState={states.survivorsState} addOnsState={states.survivorItemAddOnsState} emptyAllowed={states.defaultEmptyAllowedState}/></Col>
            <Col><Selector type={"Perks"} optionsState={states.survivorPerksState} addOnsState={states.survivorItemAddOnsState} emptyAllowed={states.allowEmptySurvivorPerk}/></Col>
            <Col><Selector type={"Item"} optionsState={states.survivorItemsState} addOnsState={states.survivorItemAddOnsState} emptyAllowed={states.noItemAllowedState} emptyAddOnAllowed={states.noItemAddOnAllowedState}/></Col>
            <Col><SurvivorOfferingSelector/></Col>
          </Row>
          <Row>
            <Col><List type={"Survivors"} id={"survivors"} listState={states.survivorsState} emptyAllowedState={states.defaultEmptyAllowedState} listUrl={urls.surivors}/></Col>
            <Col><List type={"Perks"} id ={"survivorPerks"} listState={states.survivorPerksState} emptyAllowedState={states.allowEmptySurvivorPerk} listUrl={urls.survivorPerks}/></Col>
            {/* <Col><List type={"Perk Traits"} id={"survivorPerkTraits"} listState={states.survivorPerkTraitsState} emptyAllowedState={states.defaultEmptyAllowedState} listUrl={urls.survivorPerkTraits}/></Col> */}
            <Col><List type={"Items"} id={"survivorItems"} listState={states.survivorItemsState} emptyAllowedState={states.noItemAllowedState} listUrl={urls.survivorItems}/></Col>
            <Col><List type={"Item Add Ons"} id={"survivorItemAddOns"} listState={states.survivorItemAddOnsState} emptyAllowedState={states.noItemAddOnAllowedState} listUrl={urls.survivorItemAddOns}/></Col>
            <Col><List type={"Offerings"} id={"survivorOfferings"} listState={states.survivorOfferingsState} emptyAllowedState={states.noSurvivorOfferingAllowedState} listUrl={urls.offerings}/></Col>
          </Row>
        </Container>
      </div>
    )
}

export { SurvivorRole };