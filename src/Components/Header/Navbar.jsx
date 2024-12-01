import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FiHeart } from "react-icons/fi";
import { RiShoppingBagLine } from "react-icons/ri";
import DropDown from "../Dropdown/Dropdown";
import logo from "../../Assets/logo.png";

const CustomNavbar = () => {
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  const { UserName, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Navbar expand="lg" bg="light" className="py-4" style={{ paddingBottom: '20px' }}>
      <Container>
        <Nav className="me-3">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src={logo} alt="Logo" style={{ height: '70px' }} className="me-2" />
          </Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto text-center fw-bold">
            <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
            <NavDropdown title="Shop" id="shop-dropdown" className="mx-2">
              <NavDropdown.Item as={Link} to="/collection-for-rent">
                Collection for Rent
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/collection-for-sale">
                Collection for Sale
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/blog" className="mx-2">Blog</Nav.Link>
            <Nav.Link as={Link} to="/about" className="mx-2">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="mx-2">Contact</Nav.Link>
          </Nav>
          <Nav className="ms-auto d-flex align-items-center">
            {!isAuthenticated ? (
              <Nav.Link as={Link} to="/loginSignUp" className="me-3">
                My Account
              </Nav.Link>
            ) : (
              <DropDown UserName={UserName} className="me-3" />
            )}
            <Nav.Link as={Link} to="/cart" className="me-3">
              <Badge bg="secondary">
                <RiShoppingBagLine size={22} />
                {cart.length > 0 && <span className="ms-1">{cart.length}</span>}
              </Badge>
            </Nav.Link>
            <Nav.Link as={Link} to="/wishlist">
              <Badge bg="secondary">
                <FiHeart size={22} />
                {wishList.length > 0 && <span className="ms-1">{wishList.length}</span>}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
