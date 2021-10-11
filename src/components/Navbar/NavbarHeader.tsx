import { FC, MouseEvent, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Location } from 'history';

import { signSelector } from '../../reducers/signSlice';

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import './NavbarHeader.css';

const NavbarHeader: FC = (): ReactElement => {
  const location: Location = useLocation();
  const { userData } = useSelector(signSelector);

  const logout = (e: MouseEvent): void => {
    e.preventDefault();
    Cookies.remove('userData', { path: '' });
    window.location.reload();
  };

  if (!userData) return <></>;

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand className="font-weight-bold" href="/">
        Expenses control
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse id="basic-navbar">
        <Nav className="mr-auto">
          <Nav.Link className={location.pathname === '/dashboard' ? 'active' : ''} href="/dashboard">
            Dashboard
          </Nav.Link>
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
        <NavDropdown title={userData.name} id="basic-nav-dropdown">
          <NavDropdown.Item href="/my-account">My account</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logout}>Sign out</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarHeader;
