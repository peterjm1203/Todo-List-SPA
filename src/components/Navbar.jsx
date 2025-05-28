import react from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';

import { FaBars } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';

// import { Container, Row, Col } from "react-bootstrap";
// Please tell me this will work

const Navbar = ({ setOpen }) => {
  function showModalBox() {
    setOpen(true);
  }
  return (
    <nav className="navbar navbar-dark">
      <div className="container-fluid bg-primary">
        <div className="navbar-header col-sm-10 col-md-11">
          <h1 className="navbar-brand text-center">
            <FaBars /> FRAMEWORKS
          </h1>
        </div>

        <div>
          <Button variant="primary" onClick={showModalBox}>
            <FaPlusCircle /> ADD
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
