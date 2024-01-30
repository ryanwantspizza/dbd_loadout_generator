import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { SurvivorOfferingSelector } from "./survivorOfferingSelector"
import { List } from "./list"
import { states } from '../states';
import { urls } from "../urls"
import { Selector } from "./selector";
import { initIndexDb } from '../Utilities/indexDb';


function SurvivorRole() {
  const [indexDb, setIndexDb] = useState(null)

  useEffect(() => {
    initIndexDb().then(indexDbInstance => {
      setIndexDb(indexDbInstance)
    }).catch(error => {
      console.error("Failed to initialize indexDb", error)
    });
  }, [])

  console.log(`IndexDb: ${indexDb}`)

    return(
      <div>
        <Container>
          <Row>
            <Col><Selector db={indexDb} type={"Survivor"} optionsState={states.survivorsState} addOnsState={states.survivorItemAddOnsState} emptyAllowed={states.defaultEmptyAllowedState}/></Col>
            <Col><Selector db={indexDb} type={"Perks"} optionsState={states.survivorPerksState} addOnsState={states.survivorItemAddOnsState} emptyAllowed={states.allowEmptySurvivorPerk}/></Col>
            <Col><Selector db={indexDb} type={"Item"} optionsState={states.survivorItemsState} addOnsState={states.survivorItemAddOnsState} emptyAllowed={states.noItemAllowedState} emptyAddOnAllowed={states.noItemAddOnAllowedState}/></Col>
            <Col><SurvivorOfferingSelector/></Col>
          </Row>
          <Row>
            <Col><List db={indexDb} type={"Survivors"} id={"survivors"} listState={states.survivorsState} emptyAllowedState={states.defaultEmptyAllowedState} listUrl={urls.surivors}/></Col>
            <Col><List db={indexDb} type={"Perks"} id ={"survivorPerks"} listState={states.survivorPerksState} emptyAllowedState={states.allowEmptySurvivorPerk} listUrl={urls.survivorPerks}/></Col>
            {/* <Col><List type={"Perk Traits"} id={"survivorPerkTraits"} listState={states.survivorPerkTraitsState} emptyAllowedState={states.defaultEmptyAllowedState} listUrl={urls.survivorPerkTraits}/></Col> */}
            <Col><List db={indexDb} type={"Items"} id={"survivorItems"} listState={states.survivorItemsState} emptyAllowedState={states.noItemAllowedState} listUrl={urls.survivorItems}/></Col>
            <Col><List db={indexDb} type={"Item Add Ons"} id={"survivorItemAddOns"} listState={states.survivorItemAddOnsState} emptyAllowedState={states.noItemAddOnAllowedState} listUrl={urls.survivorItemAddOns}/></Col>
            <Col><List db={indexDb} type={"Offerings"} id={"survivorOfferings"} listState={states.survivorOfferingsState} emptyAllowedState={states.noSurvivorOfferingAllowedState} listUrl={urls.offerings}/></Col>
          </Row>
        </Container>
      </div>
    )
}

export { SurvivorRole };