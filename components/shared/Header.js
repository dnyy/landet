import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useUser } from "@auth0/nextjs-auth0";
import { isAuthorized } from "utils/auth";
import { useResizeDetector } from "react-resize-detector";
import ActiveLink from "@components//shared/ActiveLink";
import Avatar from "./Avatar";

const BsNavLink = (props) => {
  const { href, title, className = "" } = props;
  return (
    <ActiveLink activeClassName="active" href={href}>
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </ActiveLink>
  );
};

const LoginLink = () => (
  <Link href="/api/custom-login">
    <a className="nav-link port-navbar-link">Logga in</a>
  </Link>
);

const LogoutLink = () => (
  <Link href="/api/auth/logout">
    <a className="nav-link port-navbar-link">Logga ut</a>
  </Link>
);

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, error, isLoading } = useUser();
  return (
    <Dropdown
      className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
    >
      <DropdownToggle className="port-dropdown-toggle" nav>
        <Avatar image={user.picture} title={user.name} imageRight />
        {/* Admin */}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/portfolio/new"
            title="Create Portfolio"
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/blog/editor"
            title="Blog Editor"
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/dashboard"
            title="Dashboard"
          />
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/api/auth/logout"
            title="Logga ut"
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const Header = ({ className }) => {
  const { width, ref } = useResizeDetector();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { user, error, isLoading } = useUser();

  return (
    <div ref={ref}>
      <Navbar
        className={`port-navbar port-default absolute ${className} ${
          width < 768 && isOpen ? "is-open" : "is-closed"
        }`}
        dark
        expand="md"
      >
        <div className="navbar-brand">
          <Link href="/">
            <a className="port-navbar-brand">
              <img alt="nedre sundet nav logo" src="/favicon.ico" />
            </a>
          </Link>
        </div>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {user && (
              <>
                {/* <NavItem className="port-navbar-item">
              <BsNavLink href="/" title="Home" />
            </NavItem> */}
                <NavItem className="port-navbar-item">
                  <BsNavLink href="/about" title="Om" />
                </NavItem>
                <NavItem className="port-navbar-item">
                  <BsNavLink href="/portfolio" title="Aktiviteter" />
                </NavItem>
                <NavItem className="port-navbar-item">
                  <BsNavLink href="/blog" title="Nyheter" />
                </NavItem>
                {/* <NavItem className="port-navbar-item">
              <BsNavLink href="/cv" title="CV" />
            </NavItem> */}
                {/* <NavItem className="port-navbar-item">
              <BsNavLink href="/houses" title="Stugorna" />
            </NavItem> */}
                {/* <NavItem className="port-navbar-item">
              <BsNavLink href="/boardOfDirectors" title="Styrelsen" />
            </NavItem> */}
                {/* <NavItem className="port-navbar-item">
              <BsNavLink href="/market" title="Marknad" />
            </NavItem> */}
                {/* <NavItem className="port-navbar-item">
              <BsNavLink href="/onlyadmin" title="Admin" />
            </NavItem> */}
              </>
            )}
          </Nav>

          <Nav navbar>
            {!isLoading && (
              <>
                {user && (
                  <>
                    {/* <Avatar image={user.picture} title={user.name} /> */}
                    {isAuthorized(user, "admin") && <AdminMenu />}
                  </>
                )}
                {!user && (
                  <NavItem className="port-navbar-item">
                    <LoginLink />
                  </NavItem>
                )}
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
