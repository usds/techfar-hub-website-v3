import * as React from "react";
import { ReactNode } from "react";
import { Link } from "gatsby";
import "./tfh.scss";

import { GovBanner, GridContainer, Grid, Header, Title, NavMenuButton } from "@trussworks/react-uswds";
import Navigation from "./navigation";
import Footer from "./footer";
import { Breadcrumbs } from "./breadcrumbs";
import { IBreadcrumb } from "../types";

interface ILayoutProps {
  children: ReactNode;
  breadCrumbs?: IBreadcrumb[];
}

const SiteLayout = ({ children, breadCrumbs }: ILayoutProps) => {
  const [navExpanded, setNavExpanded] = React.useState(false);
  const onNavExpand = (): void => setNavExpanded((prvExpanded) => !prvExpanded);

  return (
    <>
      <GovBanner />
      <Header extended={true}>
        <div className="usa-navbar">
          <Title>
            <Link to="/">TechFAR Hub</Link>
            {/* TODO: Replace with a real component and not inline styles */}
            <em style={{ display: "block", fontSize: "50%", fontWeight: "normal" }}>
              an initiative of US Digital Service
            </em>
          </Title>
          <NavMenuButton onClick={onNavExpand} label="Menu" />
        </div>
        <Navigation isNavExpanded={navExpanded} onNavExpanded={onNavExpand} />
      </Header>

      <main id="main-content">
        <GridContainer>
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
    </>
  );
};

export default SiteLayout;
