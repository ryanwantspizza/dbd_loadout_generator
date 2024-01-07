import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { KillerSelector } from './killerSelector'; 
import { OfferingSelector } from "./survivorOfferingSelector"
import { List } from "./list"
import { states } from '../states';
import { urls } from "../urls"

function KillerRole() {
    return(
        <div>
          <Container>
            <Row>
              <Col><KillerSelector/></Col>
            </Row>
            <Row>
              <Col><List id={"killers"} listState={states.killersState} emptyAllowedState={states.defaultEmptyAllowedState} listUrl={urls.killers}/></Col>
              <Col><List id={"killerPerks"} listState={states.killerPerksState} emptyAllowedState={states.allowEmptyKillerPerkSlot} listUrl={urls.killerPerks}/></Col>
              <Col><List id={"killerOfferings"} listState={states.killerOfferingsState} emptyAllowedState={states.noKillerOfferingAllowedState} listUrl={urls.offerings}/></Col>
              <Col><List id={"killerAddOns"} listState={states.killerAddOnsState} emptyAllowedState={states.noKillerAddOnAllowedState} listUrl={urls.killerAddOns}/></Col>
            </Row>
          </Container>
        </div>
      )

}

export { KillerRole };