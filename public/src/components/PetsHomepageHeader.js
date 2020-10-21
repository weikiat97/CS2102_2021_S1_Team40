import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

function PetsHomepageHeader() {
  const classes = useStyles();
  return (
    <header>
      <Container fluid className={classes.margin}>
        <Row>
          <Col className={classes.alignLeft}><h1>My Profile as a Pet Owner</h1></Col>
          <Col className={classes.alignRight}>
            <Link to="/profile/leaves">
            <Button variant="contained" color="primary">Request for Caretaker</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "2rem"
  },
  alignLeft: {
    textAlign: "left"
  },
  alignRight: {
    textAlign: "right"
  }
}));

export default PetsHomepageHeader;
