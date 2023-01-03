import * as React from "react";
import { ReactNode } from "react";
import { Link, withPrefix } from "gatsby";
import "./tfh.scss";

import { GovBanner, GridContainer, Grid, Header, Title, NavMenuButton } from "@trussworks/react-uswds";
import Navigation from "./navigation";
import Footer from "./footer";
import { Breadcrumbs } from "./breadcrumbs";
import { IBreadcrumb } from "../types";

interface ILayoutProps {
  children: ReactNode;
  breadCrumbs?: IBreadcrumb[];
  className?: string;
}

const SiteLayout = ({ children, breadCrumbs, className }: ILayoutProps) => {
  const [navExpanded, setNavExpanded] = React.useState(false);
  const onNavExpand = (): void => setNavExpanded((prvExpanded) => !prvExpanded);

  return (
    <>
      <GovBanner />
      <Header extended={true}>
        <div className="usa-navbar">
          <Title>
            <Link to="/">TechFAR Hub</Link>
            <em className="tfh-tagline">
              <img
                className="tfh-tagline-logo"
                src={withPrefix("/images/usds-logo-footer.svg")}
                alt="United States Digital Service"
              />
              <span>U.S. DIGITAL SERVICE</span>
            </em>
          </Title>
          <NavMenuButton onClick={onNavExpand} label="Menu" />
        </div>
        <div className="tfh-nav-border"></div>
        <GridContainer className="tfh-nav-grid">
          <Grid row>
            <Navigation isNavExpanded={navExpanded} onNavExpanded={onNavExpand} />
          </Grid>
        </GridContainer>
      </Header>

      <main id="main-content" className={className}>
        <GridContainer>
          <hr className="tfh-top-hr" />
          <Grid row>
            {breadCrumbs && (
              <Grid col="fill">
                <Breadcrumbs breadCrumbs={breadCrumbs}></Breadcrumbs>{" "}
              </Grid>
            )}
          </Grid>
          <Grid row>
            <Grid col="fill">{children}</Grid>
          </Grid>
        </GridContainer>
      </main>
      <Footer />
      <script
        src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=Executive%20Office%20of%20the%20President&subagency=USDS"
        id="_fed_an_ua_tag"
      ></script>
      <script src="https://touchpoints.app.cloud.gov/touchpoints/e93bb39d.js"></script>
    </>
  );
};

export default SiteLayout;
