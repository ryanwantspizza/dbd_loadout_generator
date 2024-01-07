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

function SurvivorRole() {

    return(
      <div>
        <Container>
          <Row>
            <Col><SurvivorSelector/></Col>
            <Col><BuildGenerator/></Col>
            <Col><ItemSelector/></Col>
            <Col><SurvivorOfferingSelector/></Col>
          </Row>
          <Row>
            <Col><List id={"survivors"} listState={states.survivorsState} emptyAllowedState={states.defaultEmptyAllowedState} listUrl={urls.surivors}/></Col>
            <Col><List id ={"survivorPerks"} listState={states.survivorPerksState} emptyAllowedState={states.allowEmptySurvivorPerk} listUrl={urls.survivorPerks}/></Col>
            <Col><List id={"survivorPerkTraits"} listState={states.survivorPerkTraitsState} emptyAllowedState={states.defaultEmptyAllowedState} listUrl={urls.survivorPerkTraits}/></Col>
            <Col><List id={"survivorItems"} listState={states.survivorItemsState} emptyAllowedState={states.noItemAllowedState} listUrl={urls.survivorItems}/></Col>
            <Col><List id={"survivorItemAddOns"} listState={states.survivorItemAddOnsState} emptyAllowedState={states.noItemAddOnAllowedState} listUrl={urls.survivorItemAddOns}/></Col>
            <Col><List id={"survivorOfferings"} listState={states.survivorOfferingsState} emptyAllowedState={states.noSurvivorOfferingAllowedState} listUrl={urls.offerings}/></Col>
          </Row>
        </Container>
      </div>
    )
}

export { SurvivorRole };