import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { TraitList } from './traitList';
import { SurvivorSelector } from './survivorSelector';
import { BuildGenerator } from './buildGenerator';
import { ItemSelector } from "./itemSelector";
import { OfferingList } from "./offeringList";
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
            <Col><List key={"survivors"} listState={survivorsState} emptyAllowedState={defaultEmptyAllowedState} listUrl={urls.surivors}/></Col>
            <Col><List key ={"survivorPerks"} listState={survivorPerksState} emptyAllowedState={allowEmptySurvivorPerk} listUrl={urls.survivorPerks}/></Col>
            <Col><List key={"survivorPerkTraits"} listState={survivorPerkTraitsState} emptyAllowedState={defaultEmptyAllowedState} listUrl={urls.survivorPerkTraits}/></Col>
            <Col><List key={"survivorItems"} listState={survivorItemsState} emptyAllowedState={noItemAllowedState} listUrl={urls.survivorItems}/></Col>
            <Col><List key={"survivorItemAddOns"} listState={survivorItemAddOnsState} emptyAllowedState={noItemAddOnAllowedState} listUrl={urls.survivorItemAddOns}/></Col>
            <Col><List key={"survivorOfferings"} listState={survivorOfferingsState} emptyAllowedState={noOfferingAllowedState} listUrl={urls.offerings}/></Col>
          </Row>
        </Container>
      </div>
    )
}

export { SurvivorRole };