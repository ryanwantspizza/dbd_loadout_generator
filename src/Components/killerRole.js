import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { KillerSelector } from './killerSelector'; 
import { OfferingSelector } from "./offeringSelector"
import { List } from "./list"
import { killersState, killerOfferingsState, defaultEmptyAllowedState, noOfferingAllowedState } from '../states';
import { urls } from "../urls"

function KillerRole() {
    return(
        <div>
          <Container>
            <Row>
              <Col><KillerSelector/></Col>
            </Row>
            <Row>
              <Col><List id={"killers"} listState={killersState} emptyAllowedState={defaultEmptyAllowedState} listUrl={urls.killers}/></Col>
              <Col><List id={"killerOfferings"} listState={killerOfferingsState} emptyAllowedState={noOfferingAllowedState} listUrl={urls.offerings}/></Col>
            </Row>
          </Container>
        </div>
      )

}

export { KillerRole };