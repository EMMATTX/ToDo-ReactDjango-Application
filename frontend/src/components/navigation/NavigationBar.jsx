import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function NavigationBar() {
  return (
    <Navbar expand="lg" variant="light" bg="light" style={{ marginBottom: "20px"}}>
      <Container>
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

