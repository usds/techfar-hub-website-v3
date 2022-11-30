import * as React from "react";
import { withPrefix, Link } from "gatsby";

import { NavDropDownButton, Menu, ExtendedNav, Search } from "@trussworks/react-uswds";

type onClickHandler = () => void;

interface iNavigation {
  isNavExpanded: boolean;
  onNavExpanded: onClickHandler;
}
const Navigation = ({ isNavExpanded, onNavExpanded }: iNavigation) => {
  const [isOpen, setIsOpen] = React.useState([false, false, false]);
  /**
   * This toggle function will handle all navigation toggle links
   *
   * @param {number} index
   */
  const onToggle = (index: number): void => {
    // The setIsOpen is used to toggle the currently selected nav link
    setIsOpen((prevIsOpen) => {
      const newIsOpen = [...isOpen];
      newIsOpen[index] = !prevIsOpen[index];

      // TODO Implement auto-closing at desktop size, ala j40
      return newIsOpen;
    });
  };

  const getStartedSubItems = [<Link to="/get-started">Get Started</Link>];

  const handbookItems = [<a href="#start">First item</a>];

  const subMenuItems = [
    <a href="#linkOne" key="one">
      Simple link one
    </a>,
    <a href="#linkTwo" key="two">
      Simple link two
    </a>,
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
        menuId="presolicitation"
        isOpen={isOpen[1]}
        label="Pre-Solicitation"
        isCurrent={false}
      />
      <Menu key="learningCenter" items={subMenuItems} isOpen={isOpen[1]} />
    </>,

    <a href="#two" key="Solicitation" className="usa-nav__link">
      <span>Solicitation</span>
    </a>,
    <a href="#three" key="evaluation" className="usa-nav__link">
      <span>Evaluation</span>
    </a>,
    <a href="#three" key="contractadmin" className="usa-nav__link">
      <span>Contract Administration</span>
    </a>,
    <a href="#three" key="resources" className="usa-nav__link">
      <span>Resources</span>
    </a>,
  ];
  return (
    <>
      <ExtendedNav
        primaryItems={mainNavItems}
        secondaryItems={[]}
        mobileExpanded={isNavExpanded}
        onToggleMobileNav={onNavExpanded}
      >
        <Search onSubmit={() => false} />
      </ExtendedNav>
    </>
  );
};

export default Navigation;
