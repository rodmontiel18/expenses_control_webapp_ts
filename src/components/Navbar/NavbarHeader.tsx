import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { signSelector } from '../../reducers/signSlice';

import './NavbarHeader.css';

const NavbarHeader = () => {
  const location = useLocation();
  const { userData } = useSelector(signSelector);

  const logout = (e: React.MouseEvent) => {
    e.preventDefault();
    Cookies.remove('userData', { path: '' });
    window.location.reload();
  };

  const renderNavbar = () => {
    return (
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand className="font-weight-bold" href="/">
          Expenses control
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar">
          <Nav className="mr-auto">
            <Nav.Link className={location.pathname === '/categories' ? 'active' : ''} href="/categories">
              Categories
            </Nav.Link>
            <Nav.Link className={location.pathname === '/expenses' ? 'active' : ''} href="/expenses">
              Expenses
            </Nav.Link>
            <Nav.Link className={location.pathname === '/incomes' ? 'active ' : ''} href="/incomes">
              Incomes
            </Nav.Link>
          </Nav>
          <NavDropdown title={userData?.name || ''} id="basic-nav-dropdown">
            <NavDropdown.Item href="/my-account">My account</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Sign out</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  const lNavbar = userData && userData.token ? renderNavbar() : null;

  return <React.Fragment>{lNavbar}</React.Fragment>;
};

export default NavbarHeader;
