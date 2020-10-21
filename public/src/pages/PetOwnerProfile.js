import React from "react";
import PetsHomepageHeader from "../components/PetsHomepageHeader";
import PetOwnerDetails from "../components/PetOwnerDetails";
import PetList from "../components/PetList";
import ReviewByPetOwner from "../components/ReviewByPetOwner";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function PetOwnerProfile(props) {
  return (
    <div>
      <Container>
        <PetsHomepageHeader />
        <Container fluid>
          <Row>
            <Col md="4">
              <PetOwnerDetails username={props.username} />
            </Col>
            <Col md="8">
              <PetList />
            </Col>
          </Row>
          <br /><br />
          <Row>
            <Col>
              <ReviewByPetOwner />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}


export default PetOwnerProfile;
