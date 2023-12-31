import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { SurvivorSelector } from './survivorSelector';
import { BuildGenerator } from './buildGenerator';
import { ItemSelector } from "./itemSelector";
import { OfferingSelector } from "./offeringSelector"
import { List } from "./list"
import {survivorsState, survivorPerksState, survivorPerkTraitsState, survivorItemsState, survivorItemAddOnsState, survivorOfferingsState, defaultEmptyAllowedState, noItemAllowedState, allowEmptySurvivorPerk, noItemAddOnAllowedState, noOfferingAllowedState } from '../states';
import { urls } from "../urls"

function SurvivorRole() {

    return(
      <div>
        <Container>
          <Row>
            <Col><SurvivorSelector/></Col>
            <Col><BuildGenerator/></Col>
            <Col><ItemSelector/></Col>
            <Col><OfferingSelector/></Col>
          </Row>
          <Row>
            <Col><List id={"survivors"} listState={survivorsState} emptyAllowedState={defaultEmptyAllowedState} listUrl={urls.surivors}/></Col>
            <Col><List id ={"survivorPerks"} listState={survivorPerksState} emptyAllowedState={allowEmptySurvivorPerk} listUrl={urls.survivorPerks}/></Col>
            <Col><List id={"survivorPerkTraits"} listState={survivorPerkTraitsState} emptyAllowedState={defaultEmptyAllowedState} listUrl={urls.survivorPerkTraits}/></Col>
            <Col><List id={"survivorItems"} listState={survivorItemsState} emptyAllowedState={noItemAllowedState} listUrl={urls.survivorItems}/></Col>
            <Col><List id={"survivorItemAddOns"} listState={survivorItemAddOnsState} emptyAllowedState={noItemAddOnAllowedState} listUrl={urls.survivorItemAddOns}/></Col>
            <Col><List id={"survivorOfferings"} listState={survivorOfferingsState} emptyAllowedState={noOfferingAllowedState} listUrl={urls.offerings}/></Col>
          </Row>
        </Container>
      </div>
    )
}

export { SurvivorRole };