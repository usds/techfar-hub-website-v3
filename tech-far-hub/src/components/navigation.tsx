import * as React from "react";
import { Link } from "gatsby";
import { USWDS_BREAKPOINTS } from "../settings";
import { useWindowSize } from "react-use";
import YAMLData from "../../content/components/main-nav.yaml";
import _ from "lodash";

import { NavDropDownButton, Menu, ExtendedNav, Search } from "@trussworks/react-uswds";

type onClickHandler = () => void;

interface INavItem {
  heading: string;
  link: string;
}

interface INavParent extends INavItem {
  children: INavItem[];
}

interface INavigation {
  isNavExpanded: boolean;
  onNavExpanded: onClickHandler;
  pagePath: string;
}
const Navigation = ({ isNavExpanded, onNavExpanded, pagePath }: INavigation) => {
  const navYAML = YAMLData as INavParent[];
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = React.useState(Array(navYAML.length).fill(false));
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

  const secondaryLinks = [
    <a href="#privacy" key="privacy">
      Privacy Policy
    </a>,
    <a href="#latest-updates" key="updates">
      Latest Updates
    </a>,
  ];

  const yamlNavItems = navYAML.map((element, idx) => {
    const menuItems = element.children.map((child) => {
      return (
        <Link to={child.link} key={`nav-link-${_.snakeCase(element.heading)}-${_.snakeCase(child.heading)}`}>
          {child.heading}
        </Link>
      );
    });
    const isCurrent = pagePath !== "/" && pagePath.startsWith(element.link);
    return (
      <>
        <NavDropDownButton
          onToggle={(): void => {
            onToggle(idx);
          }}
          menuId={`menu-${_.snakeCase(element.heading)}`}
          isOpen={isOpen[idx]}
          label={element.heading}
          isCurrent={isCurrent}
        />
        <Menu key={_.snakeCase(element.heading)} items={menuItems} isOpen={isOpen[idx]} />
      </>
    );
  });
  return (
    <>
      <ExtendedNav
        primaryItems={yamlNavItems}
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
