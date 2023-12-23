import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { PerkList } from './perkList';
import { TraitList } from './traitList';
import { SurvivorList } from './survivorList';
import { SurvivorSelector } from './survivorSelector';
import { BuildGenerator } from './buildGenerator';
import { ItemList } from "./itemList";
import { ItemSelector } from "./itemSelector";
import { ItemAddOnList } from "./itemAddOnList";
import { OfferingList } from "./offeringList";
import { OfferingSelector } from "./offeringSelector"

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
            <Col><SurvivorList/></Col>
            <Col><PerkList/></Col>
            <Col><TraitList/></Col>
            <Col><ItemList/></Col>
            <Col><ItemAddOnList/></Col>
            <Col><OfferingList/></Col>
          </Row>
        </Container>
      </div>
    )
}

export { SurvivorRole };