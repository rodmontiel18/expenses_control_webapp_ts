import { FC, MouseEvent, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Location } from 'history';

import { userSelector } from '../../reducers/userSlice';

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import './NavbarHeader.css';

const NavbarHeader: FC = (): ReactElement => {
  const location: Location = useLocation();
  const { profile } = useSelector(userSelector);

  const logout = (e: MouseEvent): void => {
    e.preventDefault();
    Cookies.remove('userData', { path: '' });
    window.location.reload();
  };

  if (!profile.token) return <></>;

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
        <NavDropdown title={profile.name} id="basic-nav-dropdown">
          <NavDropdown.Item href="/my-account">My account</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logout}>Sign out</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarHeader;
