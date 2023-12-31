import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { KillerSelector } from './killerSelector'; 
import { OfferingSelector } from "./offeringSelector"
import { List } from "./list"
import { killersState, defaultEmptyAllowedState, noOfferingAllowedState } from '../states';
import { urls } from "../urls"

function KillerRole() {
    return(
        <div>
          <Container>
            <Row>
              <Col><KillerSelector/></Col>
            </Row>
            <Row>
              <Col><List key={"killers"} listState={killersState} emptyAllowedState={defaultEmptyAllowedState} listUrl={urls.killers}/></Col>
            </Row>
          </Container>
        </div>
      )

}

export { KillerRole };