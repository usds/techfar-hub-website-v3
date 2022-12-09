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
  const [isOpen, setIsOpen] = React.useState(Array(6).fill(false));
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

  const getStartedSubItems = [
    <Link to="/get-started/">Get Started</Link>,
    <Link to="/get-started/how-to-use/">How to Use TFH</Link>,
  ];

  const secondaryLinks = [
    <a href="#privacy" key="privacy">
      Privacy Policy
    </a>,
    <a href="#latest-updates" key="updates">
      Latest Updates
    </a>,
  ];

  const preSolicitationSubMenuItems = [
    <Link to="/pre-solicitation/agile-overview/">Agile overview</Link>,
    <Link to="/pre-solicitation/planning-for-agile/">Planning for Agile</Link>,
    <Link to="/pre-solicitation/market-research/">Market Research</Link>,
    <Link to="/pre-solicitation/requirements-development/">Requirements Development</Link>,
  ];

  const solicitationSubMenuItems = [
    <Link to="/solicitation/contract-design/">Contract Design</Link>,
    <Link to="/solicitation/vehicles/">Vehicles</Link>,
    <Link to="/solicitation/performance-based-contracting/">Performance Based Contracting</Link>,
    <Link to="/solicitation/small-business-programs/">Small Business Program</Link>,
    <Link to="/solicitation/terms-conditions/">Terms and Conditions</Link>,
    <Link to="/solicitation/protests/">Protests</Link>,
  ];

  const evaluationSubMenItems = [
    <Link to="/evaluation/technical-evaluation/">Technical Evaluation</Link>,
    <Link to="/evaluation/price-evaluation">Price Evaluation</Link>,
  ];

  const contractAdminSubItems = [
    <Link to="/contract-administration/contract-administration-and-audit-services/">
      Contract Administration and Audit Services
    </Link>,
    <Link to="/contract-administration/modifications/">Modifications</Link>,
    <Link to="/contract-administration/subcontracting-policies-procedures/">
      Subcontracting Policies and Procedure
    </Link>,
    <Link to="/contract-administration/quality-assurance">Quality Assurance</Link>,
    <Link to="/contract-administration/terminating-agile-contracts">Terminating Agile Contracts</Link>,
  ];

  const resourcesSubItems = [
    <Link to="/resources/learning-center">Learning Center</Link>,
    <Link to="/resources/case-studies/">Case Studies</Link>,
    <Link to="/resources/templates-samples/">Templates and Samples</Link>,
    <Link to="/resources/policy-guidance/">Policy and Guidance</Link>,
    <Link to="/resources/contract-solutions-vehicles">Contract Solutions and Vehicles</Link>,
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
        isCurrent={false}
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
      <Menu key="preSolicitation" items={preSolicitationSubMenuItems} isOpen={isOpen[1]} />
    </>,
    <>
      <NavDropDownButton
        onToggle={(): void => {
          onToggle(2);
        }}
        menuId="solicitationDropdown"
        isOpen={isOpen[2]}
        label="Solicitation"
        isCurrent={false}
      />
      <Menu key="solicitation" items={solicitationSubMenuItems} isOpen={isOpen[2]} />
    </>,
    <>
      <NavDropDownButton
        onToggle={(): void => {
          onToggle(3);
        }}
        menuId="evaluationDropdown"
        isOpen={isOpen[3]}
        label="Evaluation"
        isCurrent={false}
      />
      <Menu key="evaluation" items={evaluationSubMenItems} isOpen={isOpen[3]} />
    </>,
    <>
      <NavDropDownButton
        onToggle={(): void => {
          onToggle(4);
        }}
        menuId="contractAdminDropdown"
        isOpen={isOpen[4]}
        label="Contract Administration"
        isCurrent={false}
      />
      <Menu key="contractAdministration" items={contractAdminSubItems} isOpen={isOpen[4]} />
    </>,
    <>
      <NavDropDownButton
        onToggle={(): void => {
          onToggle(5);
        }}
        menuId="resourcesDropdown"
        isOpen={isOpen[5]}
        label="Resources"
        isCurrent={false}
      />
      <Menu key="resources" items={resourcesSubItems} isOpen={isOpen[5]} />
    </>,
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
