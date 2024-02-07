import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Selector } from './selector'; 
import { List } from "./list"
import { states } from '../states';
import { urls } from "../urls"

function KillerRole() {
    return(
        <div>
          <Container>
            <Row>
              <Col><Selector id={"killersCurrentSelection"} selectionType={"Killer"} optionsState={states.killersState} addOnsState={states.killerAddOnsState} emptyAddOnAllowed={states.noKillerAddOnAllowedState}/></Col>
              <Col><Selector id={"killerPerksCurrentSelection"} selectionType={"Perks"} optionsState={states.killerPerksState} addOnsState={states.killerAddOnsState} emptyAllowed={states.allowEmptyKillerPerkSlot}/></Col>
              <Col><Selector id={"killerOfferingsCurrentSelection"} selectionType={"Offering"} optionsState={states.killerOfferingsState} addOnsState={states.killerAddOnsState} emptyAllowed={states.noKillerOfferingAllowedState}/></Col>
            </Row>
            <Row>
              <Col><List filter={"Killers"} id={"killers"} listState={states.killersState} emptyAllowedState={states.defaultEmptyAllowedState} listUrl={urls.killers}/></Col>
              <Col><List filter={"Perks"} id={"killerPerks"} listState={states.killerPerksState} emptyAllowedState={states.allowEmptyKillerPerkSlot} listUrl={urls.killerPerks}/></Col>
              <Col><List filter={"Offerings"} id={"killerOfferings"} listState={states.killerOfferingsState} emptyAllowedState={states.noKillerOfferingAllowedState} listUrl={urls.offerings}/></Col>
              <Col><List filter={"Add Ons"} id={"killerAddOns"} listState={states.killerAddOnsState} emptyAllowedState={states.noKillerAddOnAllowedState} listUrl={urls.killerAddOns}/></Col>
            </Row>
          </Container>
        </div>
      )

}

export { KillerRole };