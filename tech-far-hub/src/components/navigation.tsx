import * as React from "react";
import { Link } from "gatsby";
import { USWDS_BREAKPOINTS } from "../settings";
import { useWindowSize } from "react-use";

import { NavDropDownButton, Menu, ExtendedNav, Search } from "@trussworks/react-uswds";

type onClickHandler = () => void;

interface iNavigation {
  isNavExpanded: boolean;
  onNavExpanded: onClickHandler;
}
const Navigation = ({ isNavExpanded, onNavExpanded }: iNavigation) => {
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = React.useState([false, false, false]);
  /**
   * This toggle function will handle all navigation toggle links
   *
   * @param {number} index
   */
  const onToggle = (index: number): void => {
    // The setIsOpen is used to toggle the currently selected nav link
    setIsOpen((prevIsOpen) => {
      let newIsOpen: Array<boolean>;
      if (width >= USWDS_BREAKPOINTS.DESKTOP) {
        // On desktop, only allow one menu item to be open at a time
        newIsOpen = new Array(isOpen.length).fill(false);
        newIsOpen[index] = !prevIsOpen[index];
      } else {
        // On mobile, allow several to open at a time
        newIsOpen = [...isOpen];
        newIsOpen[index] = !prevIsOpen[index];
      }
      return newIsOpen;
    });
  };

  const getStartedSubItems = [<Link to="/get-started">Get Started</Link>];
  const secondaryLinks = [
    <a href="#privacy" key="privacy">
      Privacy Policy
    </a>,
    <a href="#latest-updates" key="updates">
      Latest Updates
    </a>,
  ];

  const subMenuItems = [
    <Link to="/pre-solicitation">Agile overview</Link>,
    <Link to="/pre-solicitation/planning-for-agile">Planning for Agile</Link>,
  ];

  const mainNavItems = [
    <>
      <NavDropDownButton
        onToggle={(): void => {
          onToggle(0);
        }}
        menuId="getStartedDropdown"
        isOpen={isOpen[0]}
        label="Get Started"
        isCurrent={true}
      />
      <Menu key="getStarted" items={getStartedSubItems} isOpen={isOpen[0]} />
    </>,
    <>
      <NavDropDownButton
        onToggle={(): void => {
          onToggle(1);
        }}
        menuId="preSolicitationDropdown"
        isOpen={isOpen[1]}
        label="Pre-Solicitation"
        isCurrent={false}
      />
      <Menu key="preSolicitation" items={subMenuItems} isOpen={isOpen[1]} />
    </>,

    <Link to="/solicitation" className="usa-nav__link">
      <span>Solicitation</span>
    </Link>,
    <a href="#three" key="evaluation" className="usa-nav__link">
      <span>Evaluation</span>
    </a>,
    <a href="#three" key="contactAdministration" className="usa-nav__link">
      <span>Contract Administration</span>
    </a>,
    <a href="#three" key="history" className="usa-nav__link">
      <span>Resources</span>
    </a>,
  ];
  return (
    <>
      <ExtendedNav
        primaryItems={mainNavItems}
        secondaryItems={secondaryLinks}
        mobileExpanded={isNavExpanded}
        onToggleMobileNav={onNavExpanded}
      >
        <Search onSubmit={() => false} />
      </ExtendedNav>
    </>
  );
};

export default Navigation;
